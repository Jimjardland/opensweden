const pgp = require('simple-pg')()
const { database } = require('../../config')

module.exports = pgp(database)