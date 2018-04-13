const db = require('../adapters/db')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const NodeGeocoder = require('node-geocoder')
const moment = require('moment')
const { google: { apiKey } } = require('../../config')

const options = {
  provider: 'google',
  apiKey
}

const geocoder = NodeGeocoder(options)

const getLongLat = async ({ address, zip, city }) =>
  geocoder.geocode({ address, country: 'Sweden', zipcode: zip })


async function addPlace (place) {
  const [ { latitude: lat, longitude: long } ] = await getLongLat(place)
  const expires = moment().add(48, 'hours')

  return db.one(`
    INSERT INTO open_places
    (
       phone_number
      ,address
      ,zip
      ,city
      ,extras
      ,lat
      ,long
      ,expires
    ) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8)
  `, [place.phoneNumber, place.address, place.zip, place.city, place.extras, lat, long, expires])
}

module.exports = {
  addPlace
}