// @flow

import { observable, action, runInAction } from 'mobx'
import { persist } from 'mobx-persist'

class UserStore {
  @observable
  @persist('list')
  currentLocation: Array<number> = []

  setUserPostion(lat: number, lng: number) {
    this.currentLocation = [lat, lng]
  }
}

export default new UserStore()
