// @flow

class MainApi {
  get(url: string) {
    return fetch(url).then((res) => res.json())
  }
}

export default new MainApi()
