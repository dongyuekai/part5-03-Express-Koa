const crypto = require('crypto')

module.exports = str => {
  return crypto.createHash('md5')
    .update('lagou' + str) // 混入了lagou
    .digest('hex') // 10进制
}