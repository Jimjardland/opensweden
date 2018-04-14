const infoService = require('../services/publicInformation')

async function getMessages (req, res, next) {
  const mock = req.params.data === 'mock'
  const data = await infoService.getMessages(mock)
  res.send(data)
}

async function createMessage (req, res, next) {
  await infoService.createMessage(req.body)
  res.send({ message: 'Successfully created message' })
}

module.exports = {
  createMessage,
  getMessages
}