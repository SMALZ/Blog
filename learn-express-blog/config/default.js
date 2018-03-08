module.exports = {
  port:3000,
  // 识别用户
  session:{
    secret:'learn-express-blog',
    key:'learn-express-blog',
    maxAge:2592000000
  },
  mongodb:'mongodb://localhost:27017/learn-express-blog'
}
