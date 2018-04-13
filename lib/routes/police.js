const policeService = require('../services/police')

async function currentEvents (req, res, next) {
  const data = await policeService.currentEvents()
  res.send(data)
}

module.exports = {
  currentEvents
}