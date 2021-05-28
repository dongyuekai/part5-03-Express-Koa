const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// 1. 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body.user)
    await user.save()
    user = user.toJSON()

    // 这里是返回到时候不返回密码这个字段
    delete user.password

    res.status(201).json({
      user
    })

  } catch (err) {
    next(err)
  }
}
// 2. 用户登录
exports.login = async (req, res, next) => {
  try {
    // 1 数据验证
    // 2 生成token 发送给客户端
    const user = req.user.toJSON()
    const token = await jwt.sign({
      userId: user._id
    }, jwtSecret, {
      expiresIn: 60 * 60 * 24
    })
    // 3 发送成功响应（包含token的用户信息）
    delete user.password
    res.status(200).json({
      ...user,
      token
    })
  } catch (error) {
    next(error)
  }
}

// 3. 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (error) {
    next(error)
  }
}
// 4. 更新当前登录用户
// 5. 获取指定用户资料
// 6. 关注用户
// 7. 取消关注用户
