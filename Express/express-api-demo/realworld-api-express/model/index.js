// mongoose 连接 mongodb服务
const mongoose = require('mongoose')
const { dbUri } = require('../config/config.default')

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

// 当连接失败的时候
db.on('error', err => {
  console.log('数据库连接失败了：', err)
})
// 当连接成功的时候
db.once('open', () => {
  console.log('数据库连接成功了')
})

// 创建数据模型
// const Cat = mongoose.model('Cat', { name: String })
// const kitty = new Cat({ name: 'helloKitty' })

// 保存数据
// kitty.save().then(() => {
//   console.log('meow')
// })

// 导出数据模型类
module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article'))
}


