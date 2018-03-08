function modalDelSub(that) {
  var url = that.nextElementSibling.getAttribute('value');
  $('#modal').modal('toggle');
  $.ajax({
    url: url,
    type: 'post',
  })
  .done((data) => {

    if(data.sign == 'comment') {
      $('div[name="removeRSign"]').remove();
      updateDelComment();
    } else {
      $('div[name="removeRCSign"]').remove();
    }
    // return true;
    // location.href = 'http://127.0.0.1:3000/blog/59ff160d76594147f73db954/';
    // console.log("success:" + data.post + data.post);
  })
  .fail((error) => {
    console.log("error:" + error);
  })
  .always((complete) => {
    // alert('complete:' + 'aaa');
    console.log("complete:" + complete);
  })
}

// $('form#subCRC').submit(() => {
//   return false;
// });

function replyCEditS(that) {
  if($(that).find('#errorERCSign')) {
    $(that).find('#errorERCSign').parent().find('textarea').attr('style','');
    $(that).find('#errorERCSign').remove();
  }
  $(that).append('<p class="errorSign" id="errorERCSign">必须填写内容</p>');
  $(that).find('textarea').attr('style','border-color: #a94442');
}

function CEditS(that) {
  if($(that).find('#errorECSign')) {
    $(that).find('#errorECSign').parent().find('textarea').attr('style','');
    $(that).find('#errorECSign').remove();
  }
  // $(that).find('#errorECSign')? $(that).find('#errorECSign').remove() : '';
  $(that).append('<p class="errorSign" style="margin-left: 52px" id="errorECSign">必须填写内容</p>');
  $(that).find('textarea').attr('style','border-color: #a94442');
}

function subEdit(that,btn) {
  var url = $(that).attr('action');
  var signT = (url + '').match(/commentReply/);
  var content = $(that).find('textarea').val();
  // console.log(url,$(that).find('textarea'),content);
  $(that).find('textarea').focus();
  if(!content && signT) {
    replyCEditS(that);
    return false;
  } else if(!content && !signT) {
    CEditS(that);
    return false;
  } else { }

  $.ajax({
    url: url,
    type: 'post',
    data: {
      content: content,
    }
  })
  .done((data) => {
    //  console.log(data.sign);
      if(data.sign == 'commentReply') {
        subCRC(that,btn,data);
      } else if(data.sign == 'comment'){
        subCE(that,btn,data);
      } else {

      }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}


function comReAdd(replyCParent,that) {
  var content = $(that).prev().val();
  var url = $(that).parent().attr('action');
  $(that).prev().focus();
  $('#errorRCSign').parent().find('textarea').attr('style',' ');
  $('#errorRCSign').remove();

  if (!content) {
    $(that).parent().append('<p class="errorSign" id="errorRCSign">必须填写内容</p>');
    $(that).prev().attr('style','border-color: #a94442');
    return false;
  }
  $.ajax({
    url: url,
    type: 'post',
    data: {
      content: content
    }
  })
  .done((data) => {
    // console.log("success",data);
    addReplyComment(replyCParent,data);
    $(that).prev().val('');
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}

function addComment(that) {
  var content = $(that).parent().prev().val();
  var url = $(that).parent().parent().parent().attr('action');
  // console.log(content,url);
  $(that).parent().prev().focus();
  $('#errorCSign').remove();
  if(!content) {
    $(that).parent().parent().parent().append('<p class="errorSign" style="margin-left: 52px" id="errorCSign">必须填写内容</p>');
    $(that).parent().prev().attr('style','border-color: #a94442');
    return false;
  }

  $.ajax({
    url: url,
    type: 'post',
    data: {
      content: content,
    }
  })
  .done(function(data) {
    console.log("success",data);
    addCommentList(data);
    updateAddComment();
    $(that).parent().prev().val('');
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  })
}


function errorSign(that,sign) {
  if($(that).val()) {
    $(that).attr('style','');
    $(that).parent().find(sign).remove();
  }
}

function addCommentList(data) {
  // console.log(data);
  var comContainer = $('#commentList');
  var i = 0;
  if( $('.comment-list-divider').last().attr('id') ) {
    console.log($('.comment-list-divider').last());
    i = -(-($('.comment-list-divider').last().attr('id').substr(-1))) + 1;
  }
  console.log(data,comContainer,i);
  var  comment1 = '<div class="comment-list-divider" id="comment-list-divider' + i + '"' + 'onmouseover="showCommentIconEdit(this)" onmouseout="hiddenCommentIconEdit(this)">' +
    '<div class="pull-left">' +
      '<img src="/img/' + data.avatar + '"' + 'alt="" class="avatar">' +
    '</div>' +
    '<div class="comment-item">' +
      '<p class="post-author"><a href=""><strong>' + data.name + '</strong></a></p>';

  var comment2q = '<span class="comment-author-sign"><a href="">作者</a></span>';

  var comment3 = '<span class="comment-time" id="commentTime"> ·  ' + data.comment.time + '</span>';

  var comment4q = '<div class="pull-right comment-icon" id="comment-icon' + i + '"' + '>' +
    '<a href="javascript:;" onclick="commentEdit(this)" id="comment-icon-edit' + i + '"' + '><span class="glyphicon glyphicon-pencil"></span></a>' +
    '<a href="javascript:;" id="comment-icon-remove' + i + '"' + ' data-toggle="modal" data-target="#modal" onclick="modalAndSubmit(this)">' +
      '<span class="glyphicon glyphicon-trash"></span>' +
      '<input type="hidden" value="/blog/' + data.comment.postId + '/comment/' + data.comment._id + '/remove__真的要删除这条评论">' +
    '</a>' +
  '</div>';

  var comment5 = '<p id="comment-content' + i + '">' + data.comment.content + '</p>' +
        '<form method="get" action="/blog/' + data.comment.postId + '/comment/' + data.comment._id + '/edit/?comment" class="hidden" id="sub-comment-content' + i + '">' +
          '<textarea name="content" class="comment-text subcc"  cols="30" rows="1" oninput="errorSign(this,\'#errorECSign\')"></textarea>' +
          '<input type="hidden">' +
        '</form>' +
        '<div class="com-btn-box">' +
          '<a href="#" id="zanIcon" class="zanIcon"><span class="glyphicon glyphicon-thumbs-up"></span></a>' +
          '<span class="comment-zan-text">赞</span>' +
          '<span class="comment-reply" onclick="commentReply(this)">回复</span>' +
        '</div>' +
        '<div class="btn-comment-edit hidden" id="btn-comment-edit' + i + '">' +
          '<button class="btn btn-xs comment-cancel" id="comment-cancel' + i  + '" onclick="cancelEdit(this)">取消</button>' +
          '<button class="btn btn-xs btn-primary" type="submit" onclick="subEdit(document.getElementById(\'sub-comment-content\' \+' + i + '),this)">保存</button>' +
        '</div>' +
        '<div class="reply-comment-list hidden">' +
        '</div>' +
        '<form onsubmit="return false" action="/blog/' + data.comment.postId + '/commentReply/' + data.comment._id + '" class="comment-reply-box hidden" id="comRe">' +
          '<textarea name="content" class="comment-text" id="creply"  cols="30" rows="1" oninput="errorSign(this,\'#errorRCSign\')"></textarea>' +
          '<button class="btn btn-default comment-add-reply" onclick="comReAdd(this.parentNode.previousElementSibling,this)">添加回复</button>' +
        '</form>' +
    '</div>' +
  '</div>'

  var comment = comment1 + ((data.author == data.comment.author && data.permiSign == 2)? comment2q : '') +
                comment3 + (data.author == data.comment.author? comment4q : '') +
                comment5;
  $(comContainer).append(comment);
}


function addReplyComment(that,data) {
  // console.log(that,userName);
  var reply1 =  '<div class="replyCommentsBox" id="replyCommentsBox" onmouseover="showReplyIcon(this)" onmouseout="hiddenReplyIcon(this)">' +
      '<div class="left-reply-zan" id="zanI2">' +
        '<a href="#" id="zanI2" class="zanIcon zanI2"><span class="glyphicon glyphicon-thumbs-up"></span></a>' +
      '</div>' +
      '<div class="right-reply-other">' +
        '<p class="comment-reply-content" id="crc">' + data.replyComment.content + '</p>'  +
        '<form action="/blog/' + data.postId + '/commentReply/' + data.replyComment._id + '/edit" class="hidden" id="subCRC">' +
          '<textarea class="comment-text comment-reply-text"  cols="30" rows="1" oninput="errorSign(this,\'#errorERCSign\')"></textarea>' +
        '</form>' +
        '<div>' +
          '<p class="post-author"><a href=""><strong>' + data.name + '</strong></a></p>';


  var reply2q = '<span class="comment-author-sign"><a href="">作者</a></span>';

  var reply3 = '<span class="comment-time" id="commentReplyTime"> ·  ' + data.replyComment.time  + '</span>' +
            '<a href="javascript:;" onclick="commentReplyEdit(this)" id="reply-icon-edit"><span class="glyphicon glyphicon-pencil"></span></a>' +
            '<a href="javascript:;" id="reply-icon-remove" data-toggle="modal" data-target="#modal" onclick="modalAndSubmit(this)">' +
              '<span class="glyphicon glyphicon-trash"></span>' +
              '<input type="hidden" value="/blog/' + data.postId + '/commentReply/' + data.replyComment._id + '/remove__你真的要删除这条回复？">' +
            '</a>' +
            '<button class="btn btn-xs comment-cancel cancel-comment-reply" id="commentRC" onclick="cancelReplyEdit(this)">取消</button>' +
            '<button class="btn btn-xs btn-primary submit-comment-reply" id="commentRS" type="submit" onclick=" return subEdit(this.parentNode.parentNode.querySelector(\'#subCRC\'),this);">保存</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  var reply = reply1 + ((data.replyComment.author == data.author && data.permiSign == 2)? reply2q : '') + reply3;
  $(that).append(reply);
}

function subCRC(that,btn,data) {
  console.log(data.replyComment);
  $(that).prev().text(data.replyComment.content);
  $(btn).parent().find('#commentReplyTime').text('.' + data.replyComment.time);
  cancelReplyEdit(btn.previousElementSibling);
}

function subCE(that,btn,data) {
  console.log($(that).prev(),data.comment);
  $(that).prev().text(data.comment.content);
  $(btn).parent().parent().find('#commentTime').text('. ' + data.comment.time);
  cancelEdit(btn.previousElementSibling);
}



function updateDelComment() {
  var objC = $('#comCount');
  var objT = $('#comTitle');
  var count = objC.text();
  var title = objT.text();
  // console.log(objC,objT,count,title);
  (count == '1')? (() => {
    objC.remove();
    objT.text('评论');
    // console.log('等于一');
  })() : (() => {
    // console.log('大于一');
    objC.text((count - 1) + '');
  })()
}

function updateAddComment() {
  var objT = $('#comTitle');
  var comCount = '<strong class="comments-stat comments-count" id="comCount">' + 1 +'</strong>';
  // console.log(objT.parent().find('#comCount'));
  if( objT.parent().find('#comCount').length == 0 ) {
    objT.parent().prepend(comCount);
    // console.log('comCount:' + comCount);
  } else if( !objT.parent().find('#comCount').text() ) {
    objT.parent().find('#comCount').text(1);
  } else {
    // console.log(objT.parent().find('#comCount').text());
    objT.parent().find('#comCount').text(-(-(objT.parent().find('#comCount').text())) + 1 + '');
  }
  objT.text('条评论');
}
