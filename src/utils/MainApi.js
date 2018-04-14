// @flow

const root = 'http://localhost:1339'

class MainApi {
  get(url: string) {
    return fetch(`${root}${url}`).then((res) => res.json())
  }

  post(url: string, data: Object) {
    return fetch(`${root}${url}`, {
      method: 'POST'
    }).then((res) => res.json())
  }
}

export default new MainApi()
