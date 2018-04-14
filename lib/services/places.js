const db = require('../adapters/db')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const NodeGeocoder = require('node-geocoder')
const { generateVerificationCode } = require('../helpers/verificationCode')
const moment = require('moment')
const { here: { appId, appCode }, sms } = require('../config')

const SmsPro = require('smspro')

const smsPro = new SmsPro(sms)

const options = {
  provider: 'here',
  appId,
  appCode
}

const geocoder = NodeGeocoder(options)
const mockPlaces = [{"phone_number":"0734119576","address":"Ringvägen 121","zip":"","city":"Enskede","extras":"Vi har en stor lokal, här kan du söka skydd och ta en kaffe","lat":"57.09954","long":"12.24784"},{"phone_number":"0713371337","address":"Blekingegatan 32","zip":"","city":"Stockholm","extras":"Vi har en stor lokal, här kan du söka skydd och ta en kaffe","lat":"59.31026","long":"18.0737"},{"phone_number":"0713371337","address":"Katarinavägen 38","zip":"","city":"Stockholm","extras":"Vi har plats för 100 personer och kan bjuda på mat.","lat":"59.45713","long":"18.31716"},{"phone_number":"0713331337","address":"Hornsgatan 17","zip":"","city":"Stockholm","extras":"Finns skydd och läkarstudent.","lat":"59.31909","long":"18.06829"},{"phone_number":"0713331337","address":"Mosebacke Torg 1","zip":"","city":"Stockholm","extras":"Vi har öppnat upp vår restaurang, här kan du komma och söka skydd och äta lite mat.","lat":"59.31832","long":"18.07431"},{"phone_number":"0713331337","address":"Nytorget 4","zip":"","city":"Stockholm","extras":"Vi har öppnat upp vår restaurang, här kan du komma och söka skydd och äta lite mat.","lat":"59.31221","long":"18.0827199"},{"phone_number":"0713331337","address":"Borgmästargatan 11","zip":"","city":"Stockholm","extras":"Vi har öppnat upp kyrkan för allmänheten.","lat":"59.31365","long":"18.08701"}]

const getLongLat = async ({ address, zip, city }) =>
  geocoder.geocode({ address, country: 'Sweden', zipcode: zip })


async function addPlace (place) {
  const active = await db.manyOrNone('SELECT 1 from open_places WHERE published = true and expires > NOW() AND phone_number = $1', [place.phoneNumber])

  if (active.length) throw new Error('Already have an active place')

  const [ { latitude: lat, longitude: long } ] = await getLongLat(place)
  const expires = moment().add(48, 'hours')
  const code = generateVerificationCode(6)

  if(!lat || !long) throw new Error('Can not find the address')

  const id = await db.one(`
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
      ,verification_code
    ) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING ID;
  `, [place.phoneNumber, place.address, place.zip, place.city, place.extras, lat, long, expires, code])

  await smsPro.sendMtSms({ to: [place.phoneNumber], message: `Din OpenSweden-kod: ${code}`})

  return id
}

async function publishPlace ({ id, code }) {
  const { verification_code: verificationCode } = await db.one('SELECT verification_code FROM open_places where id = $1', [id])

  if(!verificationCode || code !== verificationCode) throw new Error('Wrong code or ID')

  return db.none(`
    UPDATE open_places
    SET published = true
    WHERE ID = $1
  `, [id])
}

async function getAvailablePlaces (mock) {
  const sql = `
      SELECT   phone_number
              ,address
              ,zip
              ,city
              ,extras
              ,lat
              ,long
      FROM open_places
      WHERE published = true
      and expires > NOW()
  `

  const data = await db.manyOrNone(sql)

  if (mock) return [...mock, ...data]

  return data
}

module.exports = {
  addPlace,
  publishPlace,
  getAvailablePlaces
}