var path =require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);//把sessionn放在connect-mongo中使用
var flash = require('connect-flash');
var config = require('config-lite');
var pkg = require('./package');
var routes = require('./routes');
var app = express();
// Object.defineProperty(global,'tempUser',{
//   value: {},
//   writable: true,
// })
// Object.defineProperty(global,'permissionSign',{
//   value: 0,       // 1为访客 2普通用户 3管理员
//   writable: true,
// })
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
  name:config.session.key,
  secret:config.session.secret, //hash
  cookie:{
    maxAge:config.session.maxAge  //过期后session自动删除
  },
  store:new MongoStore({ //将session保存到mongodb
    url:config.mongodb
  })
}));
app.use(flash());
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.wo = req.session.wo;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});
routes(app);
app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500).send('something error');
})

app.listen(config.port,function(){
  console.log(`${pkg.name} listen on port ${config.port}`)
});
