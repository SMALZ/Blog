var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  req.session.user = null;
  req.session.wo = null;
  // req.flash('success','注销成功');
  res.redirect('/');
})


module.exports = router;
