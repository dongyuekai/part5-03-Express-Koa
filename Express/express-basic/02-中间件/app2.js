const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('>> one')
  next()
  console.log('<< one')
})
app.use((req, res, next) => {
  console.log('>> two')
  next()
  console.log('<< two')
})
app.use((req, res, next) => {
  console.log('>> three')
  console.log('<< three')
})

app.listen(4000, () => {
  console.log('server is running at 4000...')
})