var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var postModel = require('../models/post');
var archiveModel = require('../models/archive');
var commentModel = require('../models/comment');
var replyCommentModel = require('../models/replyComment');
var mdPost = require('../lib/mdPost');
var commentDeal = require('../lib/commentDeal');
var archiveDeal = require('../lib/archiveDeal');
var integrateComments = require('../lib/integrateComments');
var sd = require('silly-datetime');
var async = require('async');
var User = require('../lib/mongo').User;


router.get('/',function(req,res,next){
  var author = '';
  var postsId = [];
  var sign = req.session.wo.sign;
  if( sign == 1) {
    author = req.session.wo._id;
  } else if(sign == 2){
    author = req.query.author;
  } else {}
  Promise.all([
    postModel.getPosts(author),
    archiveModel.findAllRankByAuthor(author),
  ])
  .then(function(result){
    console.log(result[1]);
    var ranks = archiveDeal.getRanks(result[1]);
    var posts = result[0];
    posts.map((item) => {
      postsId.push(commentModel.getCommentsCountByPostId(item._id + ''));
    })

    Promise.all(postsId)
    .then((postComments) => {
      posts.map((item,value) => {
        posts[value].commentCount = postComments[value];
      })

      posts = mdPost.getBriefPosts(posts);
      res.render('posts',{
        posts: posts,
        ranks: ranks,
        revise: 'N',
        permiSign: sign,
      });
    }).catch(next);
  }).catch(next);

});

router.get('/create',function(req,res,next){
  var author = req.session.user._id;
  Promise.all([
    archiveModel.findArchive(author),
    archiveModel.findAllRankByArchive(),
  ]).then(function(result){
    console.log('archive:' + result[0] + 'ranks:' + result[1]);
    res.render('create',{
      post: '',
      archives: result[0]?result[0]:'',
      ranks: result[1]?result[1]:'',
      permiSign: req.session.wo.sign
    });
  })
  .catch(next);
})

router.post('/create',function(req,res,next){
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  var rank = req.fields.rank;
  var label = req.fields.label;
  var postId = req.fields.id;
  // console.log(postId + author + title + 'aa:' + content + rank + label);
  try{
    if(!title){
      throw new Error('标题为空');
    }
    if(!content){
      throw new Error('内容为空');
    }
    if(!rank){
      throw new Error('类别为空');
    }
    if(!label){
      throw new Error('标签为空');
    }
  } catch(e) {
    req.flash('error',e.message);
    res.redirect('back');
  }

  // res.render('create',{
  //   label: 'Y',
  // })


  time = sd.format(new Date(),'YYYY年MM月DD日');
  var post = {
    author: author,
    title: title,
    rank: rank,
    label: label,
    content: content,
    time: time,
    pv: 0
  }

  var updatePost = {
    title: title,
    rank: rank,
    label: label,
    content: content,
  }

  if(postId != 0) {
    Promise.all([
      postModel.updatePostById(author,postId,updatePost),
      archiveModel.insertArchive({rank,label,author}),
    ]).then(function(result){
      res.redirect('/blog/' + postId);
    }).catch(next);
  }else if(title && content && rank && label) {
    Promise.all([
      postModel.create(post),
      archiveModel.insertArchive({rank,label,author}),
    ]).then(function(result){
      res.redirect(`/blog/${post._id}`);
    }).catch(next);
 } else {}
 });



router.get('/:postId',function(req,res,next){
  // console.log(req.params);
  var postId = req.params.postId;
  var author = '';
  var error = '';
  var comments = '';
  var commentsCount = '';
  var post = '';
  var commentsUserInfo = [];
  var commentReplys = [];
  var commentsInfo = [];

    Promise.all([
      postModel.getPostById(postId),
      commentModel.getComments(postId),
      commentModel.getCommentsCount(postId),
      postModel.incPv(postId),
    ]).then(function(result){
      // console.log(commentsInfo);
      post = result[0];
      commentsCount = result[2];
      result[1].map((item) => {
        commentsInfo.push(userModel.getCommentsAvatar(item));
        commentsInfo.push(replyCommentModel.getreplyComment(item));
      })
        Promise.all(
          commentsInfo
        )
        .then((userInfo) => {
          commentsUserInfo = userInfo;
          // comment = integrateComments.getComments(userInfo,result[1]);
          comments = integrateComments.getReplyComments(userInfo);
          // console.log(comments);
          comments.forEach((replys,i) => {
            replys.forEach((reply,j) => {
              commentReplys.push(userModel.getCommentsAvatar(reply));
            })
          });

          Promise.all(commentReplys)
          .then((cRUI) => {
            comments = result[1];
            comments = integrateComments.getComments(commentsUserInfo,comments,cRUI);
            // console.log(comments);

            var content = post.content;
            if(!post){
              throw new Error('该文章不存在');
            }
            post = mdPost.getmdPost(post);
            post.t = mdPost.getBriefPostTime(post.time);
            // console.log(post,comments,error);
            console.log(comments);
            comments = commentDeal.getCommentTime(comments);
            comments.count = commentsCount;
            console.log('a:'+ post.postH.hTitle+'b:' +post.postH.hOrder)
            res.render('post',{
              post: post,
              comments: comments,
              error: '',
              revise: 'Y',
              permiSign: req.session.wo.sign,
            });
          })
          // console.log(userInfo);
          // console.log(comment);
        })
        .catch(next);
      })
    })


router.get('/:postId/edit',function(req,res,next){
  var postId = req.params.postId;
  var author = req.session.user._id;
  Promise.all([
    postModel.getPostByIdText(postId),
    archiveModel.findArchive(author),
    archiveModel.findAllRankByArchive(),
  ])
  .then(function(result){
    res.render('create',{
      post: result[0],
      archives: result[1],
      ranks: result[2],
      permiSign: req.session.wo.sign
    })
  }).catch(next);
});


router.get('/:postId/remove',function(req,res,next){
  var postId = req.params.postId;
  var userId = req.session.user._id;

  postModel.delPostById(postId,userId)
  .then(() => {
    res.redirect('/blog/?author=' + userId);
  })
});

router.post('/:postId/comment',
(req, res, next) => {
  var author = req.session.user._id || '59cb2273a02bdee659402eba';
  var name = req.session.user.name || 'visitor';
  var avatar = req.session.user.avatar || 'user-default.png';
  var content = req.fields.content;
  var postId = req.params.postId;
  console.log(name,avatar,author);

  commentModel.createComment({ content, author, postId })
  .then(() => {
      commentModel.getCommentByCon({ content, author, postId })
      .then((comment) => {
        comment = commentDeal.getOneCommentTime(comment);
        console.log(comment);
        res.send({
          status: 'success',
          comment: comment,
          author: author,
          name: name,
          avatar: avatar,
          permiSign: req.session.wo.sign
        })
      })
  })
})



 router.post('/:postId/comment/:commentId/edit',
 (req, res, next) => {
   var content = req.fields.content;
   var _id = req.params.commentId;
    commentModel.updateComment({_id,content})
    .then(() => {
      commentModel.getComment(_id)
      .then((comment) => {
        comment = commentDeal.getOneCommentTime(comment);
        res.send({
          status: 'success',
          sign: 'comment',
          comment: comment
        })
      })
    })
 })



router.post('/:postId/comment/:commentId/remove',function(req,res,next) {
  var commentId = req.params.commentId;

  commentModel.delCommentById(commentId)
  .then(() => {
    res.send({
      status: 'success',
      sign: 'comment'
    })
  })
  .catch(next)

})


router.post('/:postId/commentReply/:commentId',
(req, res, next) => {
  var author = req.session.user._id || '59cb2273a02bdee659402eba';
  var content = req.fields.content;
  var commentId = req.params.commentId;
  var postId = req.params.postId;
  var name = req.session.user.name || 'visitor';

  replyCommentModel.create({ content, author, commentId })
  .then(() => {
      replyCommentModel.getReplyCommentByCon({ content, author, commentId })
      .then((replyComment) => {
        replyComment = commentDeal.getOneCommentTime(replyComment);
        res.send({
          status: 'success',
          replyComment: replyComment,
          author: author,
          postId: postId,
          name: name,
          permiSign: req.session.wo.sign
        })
      })
  })
})


router.post('/:postId/commentReply/:commentReplyId/remove',
  (req, res, next) => {
    var commentRId = req.params.commentReplyId;

    replyCommentModel.deleteReplyComment(commentRId)
    .then(() => {
      res.send({
        status: 200,
        sign: 'replyComment'
      })
    })
    .catch(next);
  })


 router.post('/:postId/commentReply/:commentReplyId/edit',
 (req, res, next) => {
   var commentRId = req.params.commentReplyId;
   var content = req.fields.content;


   replyCommentModel.editReplyComment(commentRId,content)
   .then((commentR) => {
     commentR = commentDeal.getOneCommentTime(commentR);
     console.log(commentR);
     res.send({
       status: 'success',
       replyComment: commentR,
       sign: 'commentReply'
     })
   })
   .catch(next);
 })

module.exports = router;
