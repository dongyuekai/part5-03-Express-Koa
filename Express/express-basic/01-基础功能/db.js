// 封装db模块
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const dbPath = path.join(__dirname, './db.json')

exports.getDb = async () => {
  const data = await readFile(dbPath, 'utf8')
  return JSON.parse(data)
}
exports.saveDb = async db => {
  // JSON.stringify(db, null, '  ') 这样json格式会格式换行写入文件
  const data = JSON.stringify(db, null, '  ')
  await writeFile(dbPath, data)
}
