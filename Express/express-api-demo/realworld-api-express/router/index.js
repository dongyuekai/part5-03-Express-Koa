const express = require('express')
const router = express.Router()

// 用户相关的路由
router.use(require('./user'))

// 文章相关的路由
router.use('/articles', require('./article'))

module.exports = router