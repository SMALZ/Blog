var postDeal = require('../lib/postDeal');

module.exports = {
  //  修改post内容，添加标题结构制作目录树
  getmdPost: post => {
    var content = post.content,
        postH = postDeal.contentHtreeByht(content);
    // console.log(postH);
    content = postDeal.addCodeClass(content);
    content = postDeal.alterHByid(content);
    // content = postDeal.addCodePreId(content);
    // content = postDeal.addCodeNoteRender(content);
    post.content = content;
    post.postH = postH;
    post.time = postDeal.briefTime(post.time);
    return post;
  },

// 获取简短博客内容
  getBriefPosts: posts => {
    var content = '',
        time = '';
    for(var i = 0; i< posts.length; i++) {
        content = postDeal.briefContent(posts[i].content);
        time = postDeal.briefTime(posts[i].time);
        posts[i].content = content;
        posts[i].time = time;
    }
    return posts;
  },

  getBriefPostTime: time => {
    return postDeal.briefTime(time);
  },
}
