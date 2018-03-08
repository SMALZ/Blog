var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var UserModel = require('../models/users');
router.get('/',function(req,res,next){
  res.render('index');
});

router.post('/',function(req,res,next){
  var name = req.fields.name;
  var password = req.fields.password;
  var sign = req.fields.sign;
  var id = '59c766367de0a19e3a458472';
  if(sign == 1){
    UserModel.getUserById(id)
    .then((user) => {
      try{
        if(!user){
          throw new Error('正在维护中....');
        }
      }catch(e) {
        req.flash('error',e.message);
        res.redirect('back');
      }
      delete user.password;
      user.sign = sign;
      req.session.wo = user;
      req.session.user = '';
      res.redirect('../blog');
    })
  } else if(sign == 2) {
    Promise.all([
      UserModel.getUserByName(name),
      UserModel.getUserById(id)
    ])
    .then(function(result){
      var user =result[0];
      try{
        if(!result[1]){
          throw new Error('正在维护中....');
        }
        if(!user){
          throw new Error('用户不存在');
        }
        if(sha1(password) !== user.password){
          throw new Error('用户或密码不对');
        }
      } catch (e) {
        req.flash('error',e.message);
        res.redirect('back');
      }
      req.flash('success','登录成功');
      delete user.password;
      result[1].sign = sign;
      req.session.wo = result[1];
      req.session.wo.password = null;
      req.session.user = user;
      res.redirect('/blog?author=' + user._id);
    });
  } else {}

});


router.get('/host',(req,res,next) => {
  req.session.wo.sign = 1;
  res.redirect('/blog');
});

router.get('/myself',(req,res,next) => {
  req.session.wo.sign = 2;
  res.redirect('/blog?author=' + req.session.user._id)
})

module.exports = router;
