const infoService = require('../services/publicInformation')

async function getMessages (req, res, next) {
  try {
    const mock = req.params.data === 'mock'
    const data = await infoService.getMessages(mock)
    res.send(data)
  } catch (err) {
    console.log(err.message)
  }
}

async function createMessage (req, res, next) {
  try {
    await infoService.createMessage(req.body)
    res.send({ message: 'Successfully created message' })
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  createMessage,
  getMessages
}