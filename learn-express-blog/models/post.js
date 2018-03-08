var Post = require('../lib/mongo').Post;
var commentModel = require('../models/comment');
var marked = require('marked');
marked.setOptions({
     gfm: true,
     tables: true,
     breaks: true,
     pedantic: false,
     sanitize: false,
     smartLists: true,
     smartypants: false
   });

Post.plugin('contentToHtml', {
  afterFind: function(posts){
    return posts.map(function (post) {
      post.content = marked(post.content);
      return post;
    });
  },
  afterFindOne: function(post) {
    if (post) {
      post.content = marked(post.content);
    }
    return post;
  }
});


module.exports = {
  create: function (post){
    return Post.create(post).exec();
  },

  getPostById: function(postId){
    return Post.findOne({_id: postId})
    .contentToHtml()
    .exec();
  },

  getPostByIdText: function(postId){
    return Post.findOne({_id: postId})
    .exec();
  },

  getPosts: function(author){
    return Post.find({author: author})
    .sort({time:-1})
    .contentToHtml()
    .exec();
  },

  // 获取post 所有标签与类别
  getPostArchive: (author) => {
    return Post.find({ author: author },{'rank':1, 'label': 1}).exec();
  },

  // 通过label 获取对应的文章
  getPostsByLabel: (post) => {
    // console.log(post);
    return Post.find({ label: post.label, rank: post.rank, author: post.author})
            .sort({time:-1}).exec();
  },

  // 通过rank 获取对应的文章
  getPostsByRank: (post) => {
    return Post.find({ rank: post.rank, author: post.author})
            .sort({time:-1}).exec();
  },

  incPv: function incPv(postId) {
    console.log(postId);
    return Post.update({_id: postId },{$inc: {pv: 1}})
    .exec();
  },

  updatePostById: function(author,postId,data){
    console.log(author,postId,data);
    return Post.update({_id: postId, author: author}, { $set: data })
    .exec();
  },

  updateLabel: function(archive,newLabel) {
    return Post.update({author: archive.author, rank: archive.rank, label: archive.label},
      { $set:{label: newLabel} }, { multi: true})
      .exec();
  },

  updateRank: function(archive,newRank) {
    return Post.update({author: archive.author, rank: archive.rank },
      { $set:{rank: newRank} }, { multi: true})
      .exec();
  },

  delPostById: function(postId, userId){
    return Post.remove({_id: postId, author: userId})
    .exec()
    .then(function (res) {
        // 文章删除后，再删除该文章下的所有留言
        if (res.result.ok && res.result.n > 0) {
          return commentModel.delCommentsByPostId(postId);
        }
      });;
  },

}
