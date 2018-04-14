const policeService = require('../services/police')

async function currentEvents (req, res, next) {
  try {
    const mock = req.params.data === 'mock'
    const data = await policeService.currentEvents(mock)
    res.send(data)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  currentEvents
}