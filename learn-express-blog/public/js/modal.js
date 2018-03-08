// 统一使用一个模态框， 通过设置一个input[type="hidden"]的value
// 通过正则表达式获取要显示的内容以及提交路径
function modalAndSubmit(that) {
  var btn = that.querySelector('input[type="hidden"]');
  // console.log(that,btn);
  // console.log(btn.value);
  var modal = document.getElementById('modal-body');
  var modalHref = document.getElementById('modalHref');
  var href = (btn.value + '').match(/[^_]+(?=__)/);
  var info = ((btn.value + '').match(/__[^\r\n]+/) + '').substr(2);
  modal.innerHTML = info;
  modalHref.setAttribute('value',href);
  var container = that.parentNode.parentNode.parentNode;

  var allmodalSN1 = document.querySelectorAll('div[name="removeRSign"]');
  var allmodalSN2 = document.querySelectorAll('div[name="removeRCSign"]');

  allmodalSN1? allmodalSN1.forEach((item) => {
    item.setAttribute('name','');
  }) : '';
  allmodalSN2? allmodalSN2.forEach((item) => {
    item.setAttribute('name','');
  }) : '';


  if((container.getAttribute('class') + '').match(/comment-list-divider/)) {
    container.setAttribute('name','removeRSign');
  } else {
    container.setAttribute('name','removeRCSign');
  }
}
