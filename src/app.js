const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/route')

const server = http.createServer((req, res) => {
  const fillPath = path.join(conf.root, req.url) //连接路径
  route(req, res, fillPath)

})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})

