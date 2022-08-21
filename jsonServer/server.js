const jsonServer = require('json-server')
const path = require('path')
const jsonFile = path.join(__dirname, 'db.json');
const server = jsonServer.create()
const router = jsonServer.router(jsonFile, { foreignKeySuffix: '_id' })

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server ativo')
})