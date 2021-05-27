const express = require('express')
const userCtrl = require('../controller/user')

const router = express.Router()

// 用户登录
router.post('/users/login',userCtrl)
// 用户注册
// 获取当前登录用户
// 更新当亲登录用户

module.exports = router