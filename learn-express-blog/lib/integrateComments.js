module.exports = {
  getComments: (userInfo,comments,replyUserInfo) => {
    // console.log(userInfo);
    var j = 0;
    var z = 0;
    // userInfo.forEach(function(item,i){
    //   console.log(i + ':' + item.avatar + item.name);
    // })
    comments.forEach((item,i) => {
      comments[i].replyCommentCount = 0;
      comments[i].avatar = userInfo[j]? userInfo[j].avatar : '';
      comments[i].name = userInfo[j]? userInfo[j].name : '';
      for(var t = 0; t < userInfo[j + 1].length; t++) {
        userInfo[j + 1][t].avatar = replyUserInfo[z].avatar;
        userInfo[j + 1][t].name = replyUserInfo[z++].name;
        comments[i]['replyComments' + t]= userInfo[j + 1][t];
        if( t == userInfo[j + 1].length - 1) {
          comments[i].replyCommentCount = t + 1;
        }
      }
      // console.log(userInfo[j+1][0]);
      j = j + 2;
    })
    return comments;
  },

  getReplyComments: (comments) => {
    var replyComments = [];
    var j = 0;
    // console.log(comments);
    for(var i = 1; i < comments.length; i = i + 2) {
      replyComments[j++] = comments[i];
      // console.log(comments[i]);
    }
    // console.log(replyComments);
    return replyComments;
  }
}
