const restify = require('restify')
const path = require('path')
const routes = require('./routes')
const config = require('./config')

const app = restify.createServer({})

app.pre(restify.pre.sanitizePath())
app.use(restify.plugins.bodyParser())

app.get(
  /\/static\/?.*/,
  restify.plugins.serveStatic({
    directory: path.join(process.cwd(), 'build')
  })
)

routes.add(app)

const port = config.port

function unknownMethodHandler(req, res) {
  if (req.method.toUpperCase() === 'OPTIONS') {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS, PATCH'
    )

    res.send(204)
  } else {
    res.send(new restify.MethodNotAllowedError())
  }
}

app.on('MethodNotAllowed', unknownMethodHandler)

app.listen(port, () => {
  console.log('listening on port', port)
})
