var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');

router.get('/',function(req, res, next){
    res.render('signup');
});

router.post('/',function(req, res, next){
  // console.log(req.fields);
  // console.log(req.files);
  var name = req.fields.name;
  var gender = req.fields.gender;
  var bio = req.fields.bio;
  var avatar = req.files.avatar.path.split(path.sep).pop();
  var password = req.fields.password;
  var repassword = req.fields.repassword;
  // console.log(name,gender,bio,avatar,password,repassword);
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符');
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x');
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符');
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像');
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符');
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致');
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path);
    req.flash('error', e.message);
    return res.redirect('/signup');
  }
  password = sha1(password);
  // mongodb js json
  var user = {
    name:name,
    password:password,
    gender:gender,
    bio:bio,
    avatar:avatar
  }
  // 连接数据库驱动
  // user表 model create
  UserModel.create(user)
    .then(function(result){
      console.log(result);
      user = result.ops[0];
      delete user.password;
      req.session.user = user;
      res.redirect('/signin');
    })
    .catch(function(e){
      fs.unlink(req.files.avatar.path);
      if (e.message.match('E11000 duplicate key')) {
        return res.redirect('/signup');
      }
      next(e);
    })
  // res.send('提交表单的处理');
})

module.exports = router;
