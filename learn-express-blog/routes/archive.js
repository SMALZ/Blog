var express = require('express');
var router = express.Router();
var archiveModel = require('../models/archive');
var postModel = require('../models/post');
var commentModel = require('../models/comment');
var mdPost = require('../lib/mdPost');
var archiveDeal = require('../lib/archiveDeal');
var postModel = require('../models/post');

router.get('/',(req, res, next) => {
  var author = req.session.user._id;
  archiveModel.findArchive(author)
  .then((archive) => {
    var archive = archiveDeal.getKeyValueArchive(archive);
    // console.log(archive);
    res.render('labelPage',{
      archives: archive,
      permiSign: req.session.wo.sign
    });
  })
});


router.get('/labelCloud',(req, res, next) => {
  var author = req.session.user._id;
  if(req.session.wo.sign == 1) {
    author = req.session.wo._id;
  }
  postModel.getPostArchive(author)
  .then((labelCloud) => {
    var labelCloud = archiveDeal.getLabels(labelCloud);
    console.log(labelCloud);
    res.render('labelCloud',{
      labelClouds: labelCloud,
      permiSign: req.session.wo.sign
    })
  })
})


router.get('/:rank/:label',(req, res, next) => {
  var label =req.params.label;
  var rank = req.params.rank;
  var author = req.session.user._id;
  var postsId = [];
  if(req.session.wo.sign == 1) {
    author = req.session.wo._id;
  }
  Promise.all([
    postModel.getPostsByLabel({label,rank,author}),
    archiveModel.findAllRankByArchive(),
  ])
  .then(function(result){
    // console.log(posts);
    var ranks = result[1];
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
        permiSign: req.session.wo.sign
      });
    }).catch(next);
  }).catch(next);
});

router.get('/:rank',(req, res, next) => {
  var author = req.session.user._id;
  var rank = req.params.rank;
  var postsId = [];
  if(req.session.wo.sign == 1) {
    author = req.session.wo._id;
  }
  Promise.all([
    postModel.getPostsByRank({rank,author}),
    archiveModel.findAllRankByArchive(),
  ])
  .then(function(result){
    // console.log(posts);
    var ranks = result[1];
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
        permiSign: req.session.wo.sign
      });
    }).catch(next);
  }).catch(next);
})


router.post('/label/edit',(req, res, next) => {
  var author = req.session.user._id;
  var preLabel = req.fields.preArchive;
  var nextLabel = req.fields.nextArchive;
  var rank = req.fields.rank;

  var newArchive = {
    author: author,
    rank: rank,
    label: nextLabel
  }

  var oldArchive = {
    author: author,
    rank: rank,
    label: preLabel
  }
  // console.log(newArchive,oldArchive);


  postModel.getPostsByLabel(newArchive)
  .then((count) => {
    // console.log(count);
    if(count != 0 && count ) {
      res.send({
        status: '200',
        info: '该标签已存在',
        sign: '0'
      })
    } else {
      Promise.all([
        postModel.updateLabel(oldArchive,nextLabel),
        archiveModel.updateLabel(oldArchive,nextLabel)
      ])
      .then(() => {
        postModel.getPostsByLabel(newArchive)
        .then((archive) => {
          // console.log(archive[0].label);
          res.send({
            status: '200',
            info: '标签编辑成功',
            sign: '1',
            label: archive[0].label
          })
        })
        .catch(next);
      })
      .catch(next);
    }
  })
  .catch(next);

})


router.post('/label/remove',(req, res, next) => {
  var author = req.session.user._id;
  var rank = req.fields.rank;
  var label = req.fields.preArchive;

  var archive = {
    author: author,
    rank: rank,
    label: label
  }

  postModel.getPostsByLabel(archive)
  .then((count) => {
    if(count != 0 && count) {
      res.send({
        status: '200',
        info: '标签已被引用',
        sign: '0'
      })
    } else {
      archiveModel.deleteLabel(archive)
      .then(() => {
        res.send({
          status: '200',
          info: '标签删除成功',
          sign: '2'
        })
      })
      .catch(next)
    }
  })
  .catch(next)
})


router.post('/rank/edit',(req, res, next) => {
  var author = req.session.user._id;
  var preRank = req.fields.preArchive;
  var nextRank = req.fields.nextArchive;

  var oldArchive = {
    author: author,
    rank: preRank
  }

  var newArchive = {
    author: author,
    rank: nextRank
  }

  postModel.getPostsByRank(newArchive)
  .then((count) => {
    if(count != 0 && count) {
      res.send({
        status: '200',
        info: '类别已存在',
        sign: '0'
      })
    } else {
      Promise.all([
        postModel.updateRank(oldArchive,nextRank),
        archiveModel.updateRank(oldArchive,nextRank)
      ])
      .then(() => {
        postModel.getPostsByRank(newArchive)
        .then((archive) => {
          console.log(archive);
          res.send({
            status: '200',
            info: '类别编辑成功',
            sign: '1',
            rank: archive[0].rank
          })
        })
        .catch(next)
      })
      .catch(next);
    }
  })
  .catch(next);

})


router.post('/rank/remove',(req, res, next) => {
  var author = req.session.user._id;
  var rank = req.fields.preArchive;

  var archive = {
    author: author,
    rank: rank
  }

  postModel.getPostsByRank(archive)
  .then((count) => {
    console.log(count);
    if(count != 0 && count) {
      res.send({
        status: '200',
        info: '类别已被引用',
        sign: '0'
      })
    } else {
      archiveModel.deleteRank(archive)
      .then(() => {
        res.send({
          status: '200',
          info: '类别删除成功',
          sign: '2'
        })
      })
      .catch(next)
    }
  })
  .catch(next)
})




module.exports = router;
