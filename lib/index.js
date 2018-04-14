const restify = require('restify')
const routes = require('./routes')

const app = restify.createServer({})

app.pre(restify.pre.sanitizePath())
app.use(restify.plugins.bodyParser())

routes.add(app)

const port = process.env.PORT || 1339


function unknownMethodHandler (req, res) {
  if (req.method.toUpperCase() === 'OPTIONS') {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', [...restify.CORS.ALLOW_HEADERS, 'authorization'].join(', '))
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')

    res.send(204)
  } else {
    res.send(new restify.MethodNotAllowedError())
  }
}

app.on('MethodNotAllowed', unknownMethodHandler)

app.listen(port, () => {
  console.log('listening on port', port)
})