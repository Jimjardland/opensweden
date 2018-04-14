const placesService = require('../services/places')

async function addPlace (req, res, next) {
  const data = await placesService.addPlace(req.body).catch(({ message }) => res.send({ message }))
  res.send(data)
}

async function publishPlace (req, res, next) {
  await placesService.publishPlace(req.body).catch(({ message }) => res.send({ message }))

  res.send({ message: 'Place successfully published' })
}

async function getAvailablePlaces (req, res, next) {
  const mock = req.params.data === 'mock'
  const data = await placesService.getAvailablePlaces(mock).catch(({ message }) => res.send({ message }))

  res.send(data)
}

module.exports = {
  addPlace,
  publishPlace,
  getAvailablePlaces
}