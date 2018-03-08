var sd = require('silly-datetime');
// 限制h(1-9),标题最多0-40

module.exports = {
  //  获取markdown语法h标题
  contentHTreeBymd: (postContentmd) => {
    return (postContentmd + '').match(/^#+\s+[^\r\n]+(?=\r\n)/mg);
  },

  // 获取html语法h标题
  contentHtreeByht: (postContentht) => {
    var postH = postContentht + '';
    // postH = postH.match(/(?=<h[1-9][^>]+>)[^<>]+(?=<[/][h][1-9]>)/mg);
    var hTitle = postH.match(/(?:[^<>]+)(?=<[/][h][1-9]>)/mg);
    var hOrder = postH.match(/(?:[1-9])(?=\sid[^>]+>[^<>]+<[/][h][1-9]>)/mg);
     return {hTitle, hOrder};
  },

  // 添加pre>code id
  addCodePreId: postContent => {
    return (postContent + '').replace(/<pre>(?=<code>)/mg,'<pre class = \'pre-code\'>');
  },

 // 添加 code class language-xxxx
 addCodeClass: postContent => {
   return (postContent + '').replace(/<code>/mg,'<code class="language-js">');
 },

// 代码注释添加渲染
  addCodeNoteRender: postContent => {
    return (postContent + '').replace(/\/\/[^\r\n]+/mg,'<span class="codeNote">$&</span>')
  },

  // 修改html-H标题id
  alterHByid: (postContent) => {
    var postHId = postContent + '',
    i = 1,
    temp = postHId,
    hasH = postHId.match(/"(?!_a-a-)[^"]*(?=">[^<]+<[/]h[1-9]>)/)? true:false;
    while(hasH){
      temp = temp.replace(/"(?!_a-a-)[^"]*(?=">[^<]+<[/]h[1-9]>)/,'"_a-a-' + i++);
      // console.log(temp);
      hasH = temp.match(/"(?!_a-a-)[^"]*(?=">[^<]+<[/]h[1-9]>)/)? true:false;
      if(i == 41) {
        hasH = false;
      }
      // console.log(i);
    }
    // temp = addCodePreId(temp);
    // aa();
    // postHId = postHId.replace(/(?:[^"]+)(?=">[^<]+<[/]h[1-9]>)/mg,'aaa'+(i++));
    return temp;
  },

// 本年日期去除年份
  briefTime: time => {
    var t = sd.format(new Date(),'YYYY');
    return time.match(new RegExp(t))? time.substr(5,time.length - 1):time;
  },

// 获取内容的第一段p标签作为简介
  briefContent: content => {
    var con = content.match(/<p>[^<]+/) + '';
    // console.log(con.length,con);
    return (con != 'null' && con != '' && con != undefined)? con.substr(3,con.length - 1):'简介哼忙～飞走了';
  }
}
