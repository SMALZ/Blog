module.exports = function(app) {
  //首页路由
  app.get('/',function(req, res){
    res.render('index');
  });
  // 注册有表单与表单后的提交
  app.use('/signup',require('./signup'));
  app.use('/signin',require('./signin'));
  app.use('/blog',require('./blog'));
  app.use('/archive',require('./archive'));
  app.use('/text',require('./text'));
  app.use('/works',require('./works'));
  app.use('/signout',require('./signout'));
}
