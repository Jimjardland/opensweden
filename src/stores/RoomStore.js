// @flow

import { observable, action, runInAction } from 'mobx'
import MainApi from '../utils/MainApi'

type Event = {}

class RoomStore {
  @observable _places: Array<Event> = []
  @observable fetchingInitEvents: boolean = false
  @observable isCreating: boolean = false

  @action
  async createPlace(data: Object) {
    runInAction(() => (this.isCreating = true))

    // runInAction(() => (this.fetchingInitEvents = true))

    const res = await MainApi.post('/add-place', data)
    this._places.push(res)

    runInAction(() => (this.isCreating = false))
  }
}

export default new RoomStore()
