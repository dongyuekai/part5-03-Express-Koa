// 路由模块
const express = require('express')
const fs = require('fs')
const { getDb, saveDb } = require('./db.js')

// 1 创建路由实例
// 路由实例相当于一个mini Express实例
const router = express.Router()

// 限定请求方法和路由的中间件
router.get('/', async (req, res, next) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (error) {
    // res.status(500).json({
    //   error: error.message
    // })
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  // res.abc()
  try {
    const db = await getDb()
    const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
    if (!todo) {
      return res.status(404).end()
    }
    res.status(200).json(todo)
  } catch (error) {
    // res.status(500).json({
    //   error: error.message
    // })
    console.log('dyk--')
    next(error)
  }
})

// 添加
router.post('/', async (req, res, next) => {
  try {
    // console.log('req.body---', req.body)

    // 1 获取客户端请求参数
    const todo = req.body

    // 2 数据验证
    if (!todo.title) {
      return res.status(422).json({
        error: 'title是必须的---'
      })
    }
    // 3 数据验证通过 把数据存储到db中
    const db = await getDb()

    const lastTodo = db.todos[db.todos.length - 1]
    db.todos.push({
      id: lastTodo ? lastTodo.id + 1 : 1,
      title: todo.title
    })
    await saveDb(db)
    // 4 发送响应 结束本次请求
    res.status(200).json(todo)
  } catch (error) {
    // res.status(500).json({
    //   error: error.message
    // })
    next(error)
  }
})

// 修改
router.patch('/:id', async (req, res, next) => {
  try {
    // 1 获取表单数据
    const todo = req.body
    // 2 查找要修改的任务项
    const db = await getDb()
    const ret = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
    if (!ret) {
      // 没找到
      return res.status(404).end()
    }
    // 合并todo到ret 达到修改ret的目的
    Object.assign(ret, todo)
    await saveDb(db)
    res.status(200).json(ret)
  } catch (error) {
    // res.status(500).json({
    //   error: error.message
    // })
    next(error)
  }
})

// 删除
router.delete('/:id', async (req, res, next) => {
  try {
    // 1 获取表单数据
    const todo = req.body
    // 2 查找要删除的任务项index
    const db = await getDb()
    const retIndex = db.todos.findIndex(todo => todo.id === Number.parseInt(req.params.id))
    if (retIndex === -1) {
      // 没找到
      return res.status(404).end()
    }
    db.todos.splice(retIndex, 1)
    await saveDb(db)
    res.status(200).json({
      msg: '删除成功'
    })

  } catch (error) {
    // res.status(500).json({
    //   error: error.message
    // })
    next(error)
  }
})

// 3 导出路由实例
module.exports = router