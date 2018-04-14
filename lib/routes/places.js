const placesService = require('../services/places')

async function addPlace (req, res) {
  try {
    const data = await placesService.addPlace(req.body)
    res.send(data)
  } catch (err) {
    console.log(err.message)
    res.send(400, err.message)
  }
}

async function publishPlace (req, res) {
  try {
    await placesService.publishPlace(req.body)

    res.send({ message: 'Place successfully published' })
  } catch (err) {
    console.log(err.message)
    res.send(400, err.message)
  }
}

async function getAvailablePlaces (req, res) {
  try {
    const mock = req.params.data === 'mock'
    const data = await placesService.getAvailablePlaces(mock)

    res.send(data)
  } catch (err) {
    console.log(err.message)
    res.send(400, err.message)
  }
}

module.exports = {
  addPlace,
  publishPlace,
  getAvailablePlaces
}