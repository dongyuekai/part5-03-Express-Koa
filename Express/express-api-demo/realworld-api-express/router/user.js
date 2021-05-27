const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')

const router = express.Router()

// 用户登录
// router.post('/users/login', userCtrl.login)
// 用户注册 先执行颜值 在执行注册
router.post('/users', userValidator.register, userCtrl.register)
// 获取当前登录用户
// 更新当亲登录用户

module.exports = router