const restify = require('restify')
const routes = require('./routes')

const app = restify.createServer({})

app.pre(restify.pre.sanitizePath())
app.use(restify.plugins.bodyParser())

routes.add(app)

const port = process.env.PORT || 1339

app.listen(port, () => {
  console.log('listening on port', port)
})