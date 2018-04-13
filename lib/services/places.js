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

  if(!verificationCode || code !== verificationCode) throw new Error('WHAT YA DOIN FAM')

  console.log('här min goda herre')
  return db.none(`
    UPDATE open_places
    SET published = true
    WHERE ID = $1
  `, [id])
}

module.exports = {
  addPlace,
  publishPlace
}