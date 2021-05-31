const koa = require('koa')

const app = new koa()

// koa没有路由系统 只有中间件功能
// ctx：context上下文对象
app.use(ctx => {
  // console.log(ctx.req.method)
  // console.log(ctx.req.url)
  // 返回值写法1
  // ctx.body = 'Hello Koa'
  // 返回值写法2
  // ctx.res.end('res Hello Koa')

  const path = ctx.path
  console.log(path)

  if (path === '/') {
    ctx.body = '首页'
  } else if (path === '/foo/') {
    ctx.body = 'foo页面'
  } else {
    ctx.body = '404 Not Found'
  }


})
app.listen(3000, () => {
  console.log('server is running at 3000...')
})