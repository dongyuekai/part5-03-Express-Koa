const jwt = require('jsonwebtoken')
const { promisify } = require('util')

// 生成 签名
exports.sign = promisify(jwt.sign)
// 验证
exports.verify = promisify(jwt.verify)
// 解码
exports.decode = promisify(jwt.decode)