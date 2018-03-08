var moment = require('moment');

module.exports = {
  getCommentTime: (comments) => {
    moment.locale('zh-cn');
    for(var i in comments) {
      comments[i].time = moment(comments[i].time).fromNow().replace(/几秒钟前/,'刚刚');
      for( var j = 0; j < comments[i].replyCommentCount; j++) {
        comments[i]['replyComments' + j].time = moment(comments[i]['replyComments' + j].time).fromNow().replace(/几秒钟前/,'刚刚');
      }

    }
    return comments;
  },

  getOneCommentTime: (com) => {
    moment.locale('zh-cn');
    com.time = moment(com.time).fromNow().replace(/几秒钟前/,'刚刚');
    return com;
  }
}
