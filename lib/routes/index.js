const { currentEvents } = require('./police')
const { addPlace, publishPlace, getAvailablePlaces } = require('./places')
const { createMessage, getMessages } = require('./publicInformation')
function indexHandler ({ method }, res, next) {
  if(method !== 'GET') res.send(303)

  res.send({
    data: {
      message: 'OpenSweden API'
    }
  })
  return next()
}

exports.add = app => {
  // standard stuff
  app.del('/', indexHandler)
  app.get('/', indexHandler)
  app.patch('/', indexHandler)
  app.post('/', indexHandler)
  app.put('/', indexHandler)

  app.get('/current-events', currentEvents)

  app.get('/get-available-places', getAvailablePlaces)
  app.post('/add-place', addPlace)
  app.post('/publish-place', publishPlace)

  app.get('/get-public-information', getMessages)
  app.post('/contribute-information', createMessage)
}
