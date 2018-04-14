const { currentEvents } = require('./police')
const path = require('path')
const fs = require('fs')
const { addPlace, publishPlace, getAvailablePlaces } = require('./places')
const { createMessage, getMessages } = require('./publicInformation')

function indexHandler({ method }, res, next) {
  if (method !== 'GET') res.send(303)

  res.send({
    data: {
      message: 'OpenSweden API'
    }
  })
  return next()
}

function renderApp(req, res) {
  const file = path.resolve(process.cwd(), 'build', 'index.html')
  const html = fs.readFileSync(file, 'utf8')
  res.setHeader('Content-Type', 'text/html')
  res.writeHead(200)
  res.end(html)
}

exports.add = (app) => {
  // standard stuff
  app.del('/', indexHandler)
  app.get('/', renderApp)
  app.patch('/', indexHandler)
  app.post('/', indexHandler)
  app.put('/', indexHandler)

  app.get('/api/current-events/:data', currentEvents) // for mock
  app.get('/api/current-events', currentEvents)

  app.get('/api/get-available-places/:data', getAvailablePlaces) // for mock
  app.get('/api/get-available-places', getAvailablePlaces)

  app.post('/api/add-place', addPlace)
  app.post('/api/publish-place', publishPlace)

  app.get('/api/get-public-information/:data', getMessages) // for mock
  app.get('/api/get-public-information', getMessages)
  app.post('/api/contribute-information', createMessage)

  // app.get('*', renderApp)
}
