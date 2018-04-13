const placesService = require('../services/places')

async function addPlace (req, res, next) {
  const data = await placesService.addPlace(req.body)
  res.send(data)
}

async function publishPlace (req, res, next) {
  await placesService.publishPlace(req.body)

  res.send({ message: 'Place successfully published' })
}

async function getAvailablePlaces (req, res, next) {
  const data = await placesService.getAvailablePlaces()

  res.send(data)
}

module.exports = {
  addPlace,
  publishPlace,
  getAvailablePlaces
}