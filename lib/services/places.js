const db = require('../adapters/db')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')

async function addPlace ({ phoneNumber, address, zip, city, extras }) {
  return db.one(`
    INSERT INTO open_places
    (
       phone_number
      ,address
      ,zip
      ,city
      ,extras
    ) VALUES
    ($1, $2, $3, $4, $5)
  `, [phoneNumber, address, zip, city, extras])
}

module.exports = {
  addPlace
}