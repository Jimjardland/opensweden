const fetch = require('node-fetch')
const parseJson = require('parse-json')
const yo = require('../../yo')

async function getCurrentEvents () {
  // debugger;
  // return fetch('https://polisen.se/H4S-2018-handelser.json', { 'Content-Type': 'application/json' })
  // .then(res => res.json())
  // // .then(async data => data.text())

  return yo

}

async function currentEvents () {
  const events = await getCurrentEvents()

  const horribleEvents = events.filter(event => event.type === 'Trafikolycka, singel')

  return horribleEvents.map(data => {
    const [lat, long] = data.location.gps.split(',')

    return {
      date: data.datetime,
      url: data.url,
      type: data.type,
      summary: data.summary,
      location: data.location.name,
      lat,
      long
    }
  })
}

module.exports = {
  currentEvents
}