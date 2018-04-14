const db = require('../adapters/db')
const moment = require('moment')
const mockInformation = [{"information":"Gärningsman sprang ner mot Björns trädgård","lat":"59.308172","long":"18.077404","expires":"2018-04-16T06:05:31.764Z"},{"information":"Gärningsmannen tog sig in i en vit volvo REGNR: LOR 195","lat":"59.314601","long":"18.077086","expires":"2018-04-16T06:15:01.192Z"}]

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

async function getMessages (mock) {
  if (mock) return mockInformation
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
