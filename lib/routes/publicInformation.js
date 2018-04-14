const infoService = require('../services/publicInformation')

async function getMessages (req, res) {
  try {
    const mock = req.params.data === 'mock'
    const data = await infoService.getMessages(mock)
    res.send(data)
  } catch (err) {
    console.log(err.message)
    res.send(400, err.message)
  }
}

async function createMessage (req, res) {
  try {
    await infoService.createMessage(req.body)
    res.send({ message: 'Successfully created message' })
  } catch (err) {
    console.log(err.message)
    res.send(400, err.message)
  }
}

module.exports = {
  createMessage,
  getMessages
}