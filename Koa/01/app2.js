const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
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