// window.onload = function(){
//            //去掉默认的contextmenu事件，否则会和右键事件同时出现。
//            document.oncontextmenu = function(e){
//                e.preventDefault();
//              };
// $(document).ready(function(that) {
//   document.oncontextmenu((e) => {
//     e.preventDefault();
//     return false;
//   });
// });

// window.onload = function(){
           //去掉默认的contextmenu事件，否则会和右键事件同时出现。
          //  document.oncontextmenu = function(e){
          //      e.preventDefault();
          //  };
// }

function preventEvent() {
  document.oncontextmenu = function(e){
      e.preventDefault();
  };
}

function editArchive(that,e) {
  preventEvent();
  var menu = document.getElementById('menu');
  document.getElementById('editBtn1').setAttribute('onclick','editBtn('+ that.getAttribute('id') + ',this)');
  document.getElementById('removeBtn1').setAttribute('onclick','editBtn('+ that.getAttribute('id')  + ',this)');
    if(e.button == 2) {
      menu.style.display = 'block';
      menu.style.left = e.clientX + 5 + 'px';
      menu.style.top = e.clientY + 5 + 'px';
    } else {
      menu.style.display = 'none';
    }
}

window.onclick=function(e){
//用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
　　   document.querySelector('#menu').style.display = 'none';
      document.oncontextmenu = function(e){}
}

function hiddenBtn() {
  document.getElementById('menu').style.display = 'none';
}


function editBtn(btn,that) {
  defaultSign();
  var type = (btn.getAttribute('id').substr(0,1) == 'r')? '类别' : '标签';
  document.querySelector('.modal-title').innerText = that.innerText + type;
  document.querySelector('#modalBodyI').value = btn.innerText;
  document.querySelector('#modalBodyI').disabled = ((that.innerText == '编辑')?false : true);
  document.querySelector('#btnSub').innerText = ((that.innerText == '编辑')?"保存" : '删除');
  document.querySelector('#btnSub').setAttribute('onclick',
          'btnSub('+ btn.id + ',' + that.id + ',this)');
  // console.log(that.id);
}

function defaultSign() {
  document.getElementById('signArchive').style.display = 'none';
  document.getElementById('signArchive').previousElementSibling.style.borderColor = '';
}

function changeSign(sign) {
  sign = sign || '内容不能为空';
  document.getElementById('signArchive').style.display = 'block';
  document.getElementById('signArchive').previousElementSibling.style.borderColor = '#a94442';
  document.getElementById('signArchive').innerText = sign;
}



function btnSub(obj,btn,that) {
  console.log(obj,btn,that);
  var content = document.getElementById('modalBodyI').value;
  if(!content) {
    changeSign();
    return false;
  }
  var type = (obj.id.substr(0,1) == 'r')? 'rank' : 'label';
  var handle = (btn.innerText == '编辑')? 'edit' : 'remove';
  var archive = obj.innerText;
  if(archive == content && handle == 'edit') {
    $('#myModal').modal('toggle');
    return false;
  }
  var rank = obj.parentNode.firstElementChild.innerText;
  console.log(obj.parentNode.firstElementChild);
  $.ajax({
    url: '/archive/'+ type + '/' + handle,
    type: 'post',
    data: {
      rank: rank,
      preArchive: archive,
      nextArchive: content,
    }
  })
  .done((result) => {
    if(result.sign == 0) {
      changeSign(result.info);
    } else if(result.sign == 1 && result.info.substr(0,2) == '标签') {
      $('#myModal').modal('toggle');
      labelEditSuccess(obj,result.label);
    } else if(result.sign == 1 && result.info.substr(0,2) == '类别') {
      $('#myModal').modal('toggle');
      rankEditSuccess(obj,result.rank);
    } else if(result.sign == 2 && result.info.substr(0,2) == '标签'){
      $('#myModal').modal('toggle');
      labelRemoveSuccess(obj);
    } else if(result.sign == 2 && result.info.substr(0,2) == '类别'){
      $('#myModal').modal('toggle');
      rankRemoveSuccess(obj);
    } else {
      changeSign('未知错误');
    }
    // console.log(result.info,result.sign);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}


function labelEditSuccess(obj,data) {
  obj.innerText = data;
}

function rankEditSuccess(obj,data) {
  obj.innerText = data;
}

function labelRemoveSuccess(obj) {
  console.log(obj.parentNode);
  obj.parentNode.removeChild(obj);
}

function rankRemoveSuccess(obj) {
  console.log(obj.parentNode.parentNode,obj.parentNode);
  obj.parentNode.parentNode.removeChild(obj.parentNode);
}

function hiddenSignArchive() {
  defaultSign()
}


function editRank(that) {

}
