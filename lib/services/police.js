const fetch = require('node-fetch')
const parseJson = require('parse-json')
const mockdata = require('../../mockdata')

async function getCurrentEvents (mock) {
  // return fetch('https://polisen.se/H4S-2018-handelser.json', { 'Content-Type': 'application/json' })
  // .then(res => res.json())
  // // .then(async data => data.text())

  if (mock) return mockdata

  return mockdata

}

async function currentEvents (mock) {
  const events = await getCurrentEvents(mock)

  const horribleEvents = events.filter(event => event.type === 'Terrorism')

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