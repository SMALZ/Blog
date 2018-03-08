var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
  res.render('works',{
    permiSign: req.session.wo.sign
  });
})

router.get('/douban',(req, res, next) => {
  res.render('douban/index',{
    permiSign: req.session.wo.sign
  })
})

router.get('/douban/read',(req, res, next) => {
  res.render('douban/read',{
    permiSign: req.session.wo.sign
  })
})

router.get('/douban/tag',(req, res, next) => {
  res.render('douban/tag',{
    permiSign: req.session.wo.sign
  })
})

router.get('/douban/novel',(req, res, next) => {
  res.render('douban/novel',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/foo',(req, res, next) => {
  res.render('tests/foo',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/verticalCenter',(req, res, next) => {
  res.render('tests/verticalCenter',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/userInfo',(req, res, next) => {
  res.render('tests/userInfo',{
    permiSign: req.session.wo.sign
  })
})


router.get('/test/dataBase',(req, res, next) => {
  res.render('tests/dataBase',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/listEvent',(req, res, next) => {
  res.render('tests/listEvent',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/ball',(req, res, next) => {
  res.render('tests/ball',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/3DBOX',(req, res, next) => {
  res.render('tests/box_3D',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/btn1',(req, res, next) => {
  res.render('tests/breadcrumbs-nav',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/btn2',(req, res, next) => {
  res.render('tests/checkbox',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/learnJS',(req, res, next) => {
  res.render('tests/closurn_oo',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/ele',(req, res, next) => {
  res.render('tests/ele',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/factory',(req, res, next) => {
  res.render('tests/factory',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/plane',(req, res, next) => {
  res.render('tests/plane',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/fileUpload',(req, res, next) => {
  res.render('tests/fileUpload',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/lagou',(req, res, next) => {
  res.render('tests/lagou',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/album',(req, res, next) => {
  res.render('tests/album',{
    permiSign: req.session.wo.sign
  })
})


router.get('/test/prototype',(req, res, next) => {
  res.render('tests/prototype',{
    permiSign: req.session.wo.sign
  })
})

router.get('/test/mock',(req, res, next) => {
  res.render('tests/mock',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation',(req, res, next) => {
  res.render('animation/index',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/circle',(req, res, next) => {
  res.render('animation/circle',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/column',(req, res, next) => {
  res.render('animation/column',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/motion',(req, res, next) => {
  res.render('animation/motion',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/nian',(req, res, next) => {
  res.render('animation/nian',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/progress',(req, res, next) => {
  res.render('animation/progress',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/star',(req, res, next) => {
  res.render('animation/star',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/svgRemove',(req, res, next) => {
  res.render('animation/svgRemove',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/walk',(req, res, next) => {
  res.render('animation/walk',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/zp',(req, res, next) => {
  res.render('animation/zp',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/zhima',(req, res, next) => {
  res.render('animation/zhima',{
    permiSign: req.session.wo.sign
  })
})


router.get('/animation/timer',(req, res, next) => {
  res.render('animation/timer',{
    permiSign: req.session.wo.sign
  })
})


router.get('/animation/video',(req, res, next) => {
  res.render('animation/video',{
    permiSign: req.session.wo.sign
  })
})

router.get('/animation/clock',(req, res, next) => {
  res.render('animation/clock',{
    permiSign: req.session.wo.sign
  })
})


module.exports = router;
