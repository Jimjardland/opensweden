// @flow

const root = '/api'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
class MainApi {
  get(url: string) {
    return fetch(`${root}${url}`).then((res) => res.json())
  }

  post(url: string, data: Object) {
    return fetch(`${root}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status < 200 || res.status > 300) {
        throw res.statusText
      }
      return res.json()
    })
  }
}

export default new MainApi()
