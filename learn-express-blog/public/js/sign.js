function showIcon(that){
  that.parentNode.style.borderColor = '#2FA599';
  that.parentNode.previousElementSibling.style.color = '#2FA599';
  if(that.style.color === 'rgb(196, 56, 50)'){
    that.value = '';
  }
  that.style.color = '';
}

function hiddenIcon(that) {
  that.parentNode.style.borderColor = '#9E9E9E';
  that.parentNode.previousElementSibling.style.color = '#414E5B';
}

function fileInput(that) {
  that.nextElementSibling.value = that.value || '未选择任何文件';
}

function selectFile(that) {
  that.style.borderColor = '#2FA599';
}

function defalueFile(that) {
  that.style.borderColor = '#9E9E9E';
}


function subSign() {
  var name = document.querySelector('#userName').value;
  var password = document.querySelector('#password').value;
  var rpassword = document.querySelector('#repeatPassword').value;
  var tel = document.querySelector('#tel').value;
  var info = document.querySelector('#info').value;
  var avatarUrl = document.querySelector('#file').value;
  var avatar = document.getElementById("avatar").files[0];
  var sign = validate({name,password,rpassword,tel,info,avatar,avatarUrl});
  if(sign == 0) return false;
  return false;
}

function validate(data) {
  // console.log(data);
  var pattern=/(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/;
  if(!(data.name.length >= 1 && data.name.length <= 10)){
    signError('userName','名字请限制在 1-10 个字符');
    return 0;
  }
  if(data.password.length < 6) {
    signError('password','密码至少 6 个字符');
    return 0;
  }
  if(data.password != data.rpassword) {
    signError('repeatPassword','两次输入密码不一致');
    return 0;
  }
  if(!pattern.test(data.tel)) {
    signError('tel','电话号码格式错误');
    return 0;
  }
  if(!(data.info.length >= 1 && data.info.length <= 30)) {
    signError('info','个人简介请限制在 1-30 个字符');
    return 0;
  }
}


function signError(id,info){
  // console.log(that.info);
  var obj = document.getElementById(id);
  // console.log(obj);
  obj.style.color = '#C43832';
  obj.parentNode.style.borderColor = '#C43832';
  obj.parentNode.previousElementSibling.style.color = '#C43832';
  obj.value = info;
}

function signCardId() {
  document.getElementById('sign').value = '1';
}

function signIn() {
  document.getElementById('sign').value = '2';
}
