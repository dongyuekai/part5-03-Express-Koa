// 渲染动态网页

const express = require('express')
const fs = require('fs')
const template = require('art-template')
const path = require('path')

const app = express()

// app.engine('html', require('express-art-template'))
app.engine('art', require('express-art-template'))
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})
app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'html')
app.set('view engine', 'art')


const todos = [
  { id: 1, title: '吃饭1' },
  { id: 2, title: '吃饭2' },
  { id: 3, title: '吃饭3' },
  { id: 4, title: '吃饭4' }
]

app.get('/', (req, res) => {
  // 渲染模板引擎
  res.render('index', {
    foo: 'bar',
    todos
  })
})
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`)
})
