// @flow

import { observable, action, runInAction } from 'mobx'
import MainApi from '../utils/MainApi'

type Event = {}

class RoomStore {
  @observable _events: Array<Event> = []
  @observable fetchingInitEvents: boolean = false
  @observable isCreating: boolean = false

  @action
  async createPlace(data: Object) {
    runInAction(() => (this.isCreating = true))

    // runInAction(() => (this.fetchingInitEvents = true))

    const res = await MainApi.post('/add-place', data)

    runInAction(() => (this.isCreating = true))
  }
}

export default new RoomStore()
