const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

// 用户登录
// router.post('/users/login', userCtrl.login)
// 用户注册 先进行验证 在执行注册
router.post('/users', userValidator.register, userCtrl.register)
// 用户登录
router.post('/users/login', userValidator.login, userCtrl.login)
// 更新当前登录用户
router.get('/user', auth, userCtrl.getCurrentUser)

module.exports = router