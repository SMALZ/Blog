$(document).ready(() => {
  var BriefPostsData = $('#BriefPostsData').attr('value');
  var pageBox = $('#pageBox');
  var sign = '#postUnit';
  var bpsData = [];
  var data = {};
  var j = 0;
  // console.log(BriefPostsData);
  bpsData = (BriefPostsData + '').match(/[^□■]+(?=□■)/mg);

  // 数据格式：
  // post._id + '□■' + post.title + '□■' + post.content + '□■'
  // + post.time + '□■' + post.label + + '□■' + post.rank + '□■' + post.pv + '□■' + post.commentCount + '□■' %>
  for(var i = 0; i < bpsData.length; j++) {
    data[j + ''] = {};
    data[j].id = bpsData[i++];
    data[j].title = bpsData[i++];
    data[j].content = bpsData[i++];
    data[j].time = bpsData[i++];
    data[j].label = bpsData[i++];
    data[j].rank = bpsData[i++];
    data[j].pv = bpsData[i++];
    data[j].commentCount = bpsData[i++];
  }
  console.log(data);
  var dataSource = commentModel;
  pager.initPage(j, 4, pageBox, data, pageBox, sign, dataSource);
})


function commentModel(post) {
  return '<div class="c-post-unit" id="postUnit">' +
      '<div class="entry">' +
        '<header>' +
          '<h2 class="entry-title">' +
            '<a href="/blog/' + post.id + '">' + post.title + '</a>' +
          '</h2>' +
        '</header>' +
        '<div class="entry-content">' +
          '<div class="archive-content">' +
            '<div class="c-post-content">' +
              '<article class="markdown-body">' + post.content + '</article>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="post-other-info">' +
          '<span>' + post.time + '</span>' +
          '<i class="iconfont icon-eye" style="margin-right:4px;"></i>' +
          '<span >' + post.pv + '</span>' +
          '<a href="/blog/' + post.id + '" class="post-comment-count">' +
            '<i class="iconfont icon-speechbubble" style="margin-right:4px;"></i>' +
            '<span>' + post.commentCount + '</span>' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<span class="entry-more" style="cursor:pointer">' +
        '<a href="/blog/' + post.id + '">阅读全文</a>' +
      '</span>' +
      '<span class="entry-label" onclick="this.children[0].click()" style="cursor:pointer">' +
        '<a href="/archive/' + post.rank  + '/' + post.label + '">' + post.label + '</a>' +
      '</span>' +
    '</div>'
}
