var Comment = require('../lib/mongo').Comment;
var ReplyComment = require('../lib/mongo').ReplyComment;
var moment = require('moment');


module.exports = {
  // 创建留言
  createComment: function (comment){
    var time = moment().format('YYYY-MM-DD HH:mm');
    comment.time = time;
     return Comment.update({content: comment.content, author: comment.author, postId: comment.postId},
    {$set: comment},{upsert: true}).exec();
  },

  // 根据博客ID与登录用户获取留言
  getComments: function(postId){
    return Comment.find({ postId: postId }).sort({time :-1}).exec();
  },

  // 通过文章 id 获取该文章下留言数
  getCommentsCount: function getCommentsCount(postId) {
    return Comment.count({ postId: postId }).exec();
  },

  // 通过文章id 获取该文章下留言数
  getCommentsCountByPostId: function getCommentsCountByPostId(postId) {
    return Comment.count({ postId: postId }).exec();
  },

  // 通过留言id 获取留言信息
  getComment: function getComment(_id) {
    return Comment.findOne({ _id: _id }).exec();
  },

  // 通过条件查询 留言信息
  getCommentByCon: function getCommentByCon(comment) {
    return Comment.findOne({ content: comment.content, author: comment.author, postId: comment.postId }).exec();
  },

  // 修改用户评论
  updateComment: function updateComment(comment) {
    var time = moment().format('YYYY-MM-DD HH:mm');
    comment.time = time;
    return Comment.update({ _id: comment._id},{$set: comment}).exec();
  },


  // 通过留言 id 删除一个留言及 回复留言
  delCommentById: function delCommentById(commentId) {
    return ReplyComment.remove({ commentId: commentId }).exec()
    .then(() => {
      return Comment.remove({ _id: commentId }).exec()
    })
  },

  // 通过文章 id 删除该文章下所有留言
  delCommentsByPostId: function delCommentsByPostId(postId) {
    return Comment.remove({ postId: postId }).exec();
  },

  // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
  // getComments: function getComments(postId) {
  //   return Comment
  //     .find({ postId: postId })
  //     .populate({ path: 'author', model: 'User' })
  //     .sort({ _id: 1 })
  //     .addCreatedAt()
  //     .contentToHtml()
  //     .exec();
  // },



}
