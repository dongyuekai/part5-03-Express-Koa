const express = require('express')
const fs = require('fs')
const { getDb, saveDb } = require('./db.js')

const app = express()

// 中间件 配置解析表单body
app.use(express.json()) // 解析 application/json 格式数据
app.use(express.urlencoded()) // 解析application/x-www-form-urlencoded  格式数据

app.get('/todos', async (req, res) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})
app.get('/todos/:id', async (req, res) => {
  try {
    const db = await getDb()
    const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
    if (!todo) {
      return res.status(404).end()
    }
    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

// 添加
app.post('/todos', async (req, res) => {
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
    res.status(500).json({
      error: error.message
    })
  }
})

// 修改
app.patch('/todos/:id', async (req, res) => {
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
    res.status(500).json({
      error: error.message
    })
  }
})

// 删除
app.delete('/todos/:id', async (req, res) => {
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
    res.status(500).json({
      error: error.message
    })
  }
})

app.listen(1234, () => {
  console.log('server is running at http://localhost:1234...')
})
