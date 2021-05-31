const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')
const mount = require('koa-mount')
const path = require('path')

const app = new Koa()

// 静态资源托管
// app.use(static(path.join(__dirname, './public')))
// 带虚拟路径的静态资源托管
app.use(mount('/public', static(path.join(__dirname, './public'))))

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Home Page'
})
router.post('/', ctx => {
  ctx.body = 'Post /'
})
router.get('/foo', ctx => {
  ctx.body = 'foo page'
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})