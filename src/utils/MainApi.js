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
      const err = res.status < 200 || res.status > 300

      return res.json().then((data) => {
        if (err) {
          throw data
        }
        return data
      })
    })
  }
}

export default new MainApi()
