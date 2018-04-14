const db = require('../adapters/db')
const moment = require('moment')

async function createMessage ({ phoneNumber, information, lat, long }) {
  const expires = moment().add(48, 'hours')
  const sql = `
    INSERT INTO public_information
    (
      information
      ,lat
      ,long
      ,expires
    ) VALUES ($1, $2, $3, $4)
  `
  return db.manyOrNone(sql, [information, lat, long, expires]).catch(err => console.log(err))
}

async function getMessages () {
  const sql = `
    SELECT  information
            ,lat
            ,long
            ,expires
    FROM public_information
    WHERE expires > NOW()
  `

  return db.manyOrNone(sql)
}

module.exports = {
  createMessage,
  getMessages
}
