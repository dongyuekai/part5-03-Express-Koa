const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// 1. 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body.user)
    await user.save()
    user = user.toJSON()

  } catch (err) {
    next(err)
  }
}
// 2. 用户登录

// 3. 获取当前登录用户
// 4. 更新当前登录用户
// 5. 获取指定用户资料
// 6. 关注用户
// 7. 取消关注用户
