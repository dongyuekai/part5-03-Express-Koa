const express = require('express')
const morgan = require('morgan')

const app = express()

// 定义响应格式
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/', (req, res) => {
  res.send('Hello World~~')
})

app.listen(3000, () => {
  console.log('server is running at port 3000...')
})


