const placesService = require('../services/places')

async function addPlace (req, res, next) {
  try {
    const data = await placesService.addPlace(req.body)
    res.send(data)
  } catch (err) {
    console.log(err.message)
  }
}

async function publishPlace (req, res, next) {
  try {
    await placesService.publishPlace(req.body)

    res.send({ message: 'Place successfully published' })
  } catch (err) {
    console.log(err.message)
  }
}

async function getAvailablePlaces (req, res, next) {
  try {
    const mock = req.params.data === 'mock'
    const data = await placesService.getAvailablePlaces(mock)

    res.send(data)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  addPlace,
  publishPlace,
  getAvailablePlaces
}