var User = require('../lib/mongo').User;
var async = require('async');

module.exports = {
    // 添加用户方法
    create:function create(user){
      return User.create(user).exec();
    },

    getUserByName:function getUserByName(name){
      return User.findOne({name:name}).exec();
    },

    getUserById: function getUserById(id) {
      return User.findOne({ _id: id}).exec();
    },

    getUserByAuthor: function getUserByAuthor(author){
      return User.findOne({_id:author}).exec();
    },

    getCommentsAvatar: function(comment) {
      return User.findOne({_id: comment.author},{'avatar':1, 'name': 1}).exec();
    },

    getCommentAvatar: function(author) {
        return User.findOne({_id: author},{'avatar':1, 'name': 1}).exec();
    }

}
