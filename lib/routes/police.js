const policeService = require('../services/police')

async function currentEvents (req, res, next) {
  const mock = req.params.data === 'mock'
  const data = await policeService.currentEvents(mock)
  res.send(data)
}

module.exports = {
  currentEvents
}