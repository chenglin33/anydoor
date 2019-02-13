const http = require('http')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const conf = require('./config/defaultConfig')

const server = http.createServer((req, res) => {
  const fillPath = path.join(conf.root, req.url) //连接路径
  fs.stat(fillPath, (err, stats) => {
    if (err) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end(`${fillPath} is not a directory or file`)
      return
    }
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      // fs.readFile(fillPath, (err, data) => { // 数据全部读完才吐给res 读取数据慢 不推荐
      //   res.end(data)
      // })
      fs.createReadStream(fillPath).pipe(res) // 通过流的方式慢慢读出来吐给res 读取数据快 推荐
    } else if(stats.isDirectory()) { //为文件夹
      fs.readdir(fillPath, (err, files) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end(files.join(','))
      })
    }
  })
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})

