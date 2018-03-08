var express = require('express');
var textModel = require('../models/text');
var router = express.Router();


router.get('/',(req, res, next) => {
  var author = req.session.user._id;
  if(req.session.wo.sign == 1) {
    author = req.session.wo._id;
  }
  textModel.getAllTextByAuthor(author)
  .then((texts) => {
    // console.log(texts);
    res.render('texts',{
      texts: texts,
      permiSign: req.session.wo.sign
    })
  }).catch(next);
})

router.get('/textEdit',(req, res, next) => {
  res.render('UEditor/index',{
    content: ''
  });
})

router.post('/textEdit/:textId',(req, res, next) => {
  var content = req.fields.content;
  var textId = req.params.textId;
  console.log(content,textId);
  res.render('UEditor/index',{
    content: content,
    id: textId,
  })
})

router.post('/textEdit',(req, res, next) => {
  var content = req.fields.content;
  var author = req.session.user._id;
  var textId = req.fields.textId;
  if(req.session.wo.sign == 1) {
    author = req.session.wo._id;
  }
  var pv = 0;
  console.log('content:' + content);
  try{
    if(!content) {
      console.log(content);
      throw new Error('内容不能为空');
    }
  } catch(e) {
    req.flash('error',e.message);
    res.redirect('back');
  }

  var text = {
    content: content,
    author: author,
    pv: pv
  }

  var newText = {
    content: content,
    author: author,
    id: textId
  }

  if(textId != 0 && content){
    textModel.updateTextById(newText)
    .then(() => {
      res.redirect('/text/' + textId);
    })
    .catch(next);
  } else if(textId == 0) {
    textModel.create(text)
    .then(() => {
      res.redirect(`/text/${text._id}`);
    }).catch(next);
  } else {}

  // res.render('')
})

router.get('/:textId',(req, res, next) => {
  var textId = req.params.textId;
  var author = req.session.user._id || req.session.wo._id;

  Promise.all([
    textModel.getTextById(textId,author),
    textModel.incPv(textId),
  ])
  .then((text) => {
    res.render('text',{
      text: text[0],
    })
  }).catch(next);
})


router.post('/:textId/remove',(req, res, next) => {
  var textId = req.params.textId;
  textModel.deleteByTextId(textId)
  .then(() => {
    res.send({
      status: '200',
    })
  })
})








module.exports = router;
