const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

module.exports = async function (req, res, fillPath) {
  try {
    const stats = await stat(fillPath)
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      // fs.readFile(fillPath, (err, data) => { // 数据全部读完才吐给res 读取数据慢 不推荐
      //   res.end(data)
      // })
      fs.createReadStream(fillPath).pipe(res) // 通过流的方式慢慢读出来吐给res 读取数据快 推荐
    } else if(stats.isDirectory()) { //为文件夹
      const files = await readdir(fillPath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(files.join(','))
    }
  } catch (ex) {
    console.error(ex)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${fillPath} is not a directory or file`)
  }
}
