const { get } = require('https')
const mockedEvent = require('../../mockdata')
const moment = require('moment')

async function getCurrentEvents () {
  return new Promise((resolve, reject) =>
    get('https://polisen.se/H4S-2018-handelser.json', res => {
      let response = ''

      res.setEncoding('utf8')

      res.on('data', chunk =>
        (response += chunk.replace(/(\r\n)|\n/g, '').trim()))
      res.on('end', () =>
        resolve(JSON.parse(response)))
    })
    .on('error', error => reject(error)))
}

async function currentEvents (mock) {
  const events = await getCurrentEvents()
  const mockData = mock ? mockedEvent : []

  const horribleEvents = events.filter(event => {
    if((event.type === 'Detonation'
      || event.type === 'Spridning smittsamma kemikalier'
      || event.type === 'Naturkatastrof'
      || event.type === 'Terrorism')
    && moment().subtract(48, 'hours') < moment(event.datetime))
    {
      return event
    }
    return null
  })

  return [...mockData, ...horribleEvents].filter(x => x).map(data => {
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
