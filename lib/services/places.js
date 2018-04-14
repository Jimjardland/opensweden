const db = require('../adapters/db')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const NodeGeocoder = require('node-geocoder')
const { generateVerificationCode } = require('../helpers/verificationCode')
const moment = require('moment')
const { here: { appId, appCode }, sms } = require('../../config')
const SmsPro = require('smspro')

const smsPro = new SmsPro(sms)

const options = {
  provider: 'here',
  appId,
  appCode
}

const geocoder = NodeGeocoder(options)

const getLongLat = async ({ address, zip, city }) =>
  geocoder.geocode({ address, country: 'Sweden', zipcode: zip })


async function addPlace (place) {
  const active = await db.manyOrNone('SELECT 1 from open_places WHERE published = true and expires > NOW() AND phone_number = $1', [place.phoneNumber])

  if (active.length) throw new Error('Already have an active place')

  const [ { latitude: lat, longitude: long } ] = await getLongLat(place)
  const expires = moment().add(48, 'hours')
  const code = generateVerificationCode(6)

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

async function getAvailablePlaces () {
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

  return db.manyOrNone(sql)
}

module.exports = {
  addPlace,
  publishPlace,
  getAvailablePlaces
}