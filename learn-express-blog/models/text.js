var Text = require('../lib/mongo').Text;
var moment = require('moment');


module.exports = {

  //  创建文本
  create: (text) => {
    var time = moment().format('YYYY-MM-DD HH:mm');
    text.time = time;
    return Text.create(text).exec();
  },

  // 根据作者获取文本
  getAllTextByAuthor: (author) => {
    return Text.find({ author: author }).sort({ time: -1 }).exec();
  },

  // 根据文本ID 获取文本
  getTextById: (id,author) => {
    return Text.findOne({ _id: id, author: author }).exec();
  },

  // 通过textId 更新内容
  updateTextById: (text) => {
    return Text.update({ _id: text.id, author: text.author},{ $set:{ content: text.content }})
    .exec();
  },

  // 浏览量加一
  incPv: (id) => {
    return Text.update({_id: id },{$inc: {pv: 1}})
    .exec();
  },

  deleteByTextId: (id) => {
    return Text.remove({ _id: id})
    .exec();
  }
}
