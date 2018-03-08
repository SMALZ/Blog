var ReplyComment =require('../lib/mongo').ReplyComment;
var moment = require('moment');

module.exports = {
  create: (replyComment) => {
    var time = moment().format('YYYY-MM-DD HH:mm');
    replyComment.time = time;
    return ReplyComment.update({ commentId: replyComment.commentId, author: replyComment.author, content: replyComment.content },
            { $set: replyComment },{ upsert: true }).exec();
  },

  find: (commentId) => {
    return ReplyComment.find({ commentId: commentId }).sort({time : -1}).exec();
  },

  getreplyComment: (comment) => {
    // console.log(comment._id);
      return ReplyComment.find({ commentId: comment._id + ''}).exec();
  },

  getReplyCommentByCon: (replyComment) => {
    return ReplyComment.findOne({ commentId: replyComment.commentId, author: replyComment.author, content: replyComment.content }).exec();
  },

  deleteReplyComment: (id) => {
    return ReplyComment.remove({ _id: id }).exec();
  },

  editReplyComment: (id, content) => {
    time = moment().format('YYYY-MM-DD HH:mm');
    return ReplyComment.update({ _id: id }, {$set:{ content: content, time: time }})
    .exec()
    .then((res) => {
      return ReplyComment.findOne({ _id: id }).exec();
    });
  }
}
