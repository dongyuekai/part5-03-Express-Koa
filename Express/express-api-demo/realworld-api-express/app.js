const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')

// 数据库连接相关
require('./model')

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 3000

// app.get('/', (req, res) => {
//   res.send('Hello World---')
// })
// app.post('/', (req, res) => {
//   console.log(req.body)
//   res.send('Hello World---')
// })

// 挂载路由
app.use('/api', router)
// 挂载统一处理服务端错误的中间件
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}...`)
})