// 代码将表设计表达
var config = require('config-lite');
// mongodb的驱动
var Mongolass = require('mongolass');
var mongolass = new Mongolass();

//运行环境，选择不同的服务器
mongolass.connect(config.mongodb);

var moment = require('moment');

exports.User = mongolass.model('User',{
  name:{type:'string'},
  password:{type:'string'},
  avatar:{type:'string'},
  gender:{type:'string',enum:['m','f','x']},
  bio:{type:'string'}
});

exports.Post = mongolass.model('Post',{
  author: {type: Mongolass.Types.ObjectId},
  title: {type:'string'},
  content: {type:'string'},
  rank: {type:'string'},
  label: {type:'string'},
  time: {type:'string'},
  pv: {type:'number'}
})

exports.Text = mongolass.model('Text',{
  content: {type: 'string'},
  author: {type: 'string'},
  time: {type: 'string'},
  pv: {type: 'number'}
})

exports.Comment = mongolass.model('Comment',{
  author: {type: 'string'},
  postId: {type: 'string'},
  content: {type: 'string'},
  time: {type: 'string'},
})

exports.Archive = mongolass.model('archive',{
  author: {type: 'string'},
  rank: {type: 'string'},
  label: {type: 'string'},
})

exports.ReplyComment = mongolass.model('ReplyComment',{
  commentId: {type: 'string'},
  content: {type: 'string'},
  author: {type: 'string'},
  time: {type: 'string'},
})
// 根据 id 生成创建时间 created_at
// mongolass.plugin('addCreatedAt', {
//   afterFind: function (results) {
//     results.forEach(function (item) {
//       item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
//     });
//     return results;
//   },
//   afterFindOne: function (result) {
//     if (result) {
//       result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
//     }
//     return result;
//   }
// });

exports.User.index({name:1},{unique:true}).exec();
