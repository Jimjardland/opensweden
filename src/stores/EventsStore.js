// @flow

import { observable, action, runInAction } from 'mobx'
import MainApi from '../utils/MainApi'

type Event = {}

class EventsStore {
  @observable _events: Array<Event> = []
  @observable fetchingInitEvents: boolean = false

  get events(): Array<Event> {
    return this._events.slice()
  }

  @action
  async fetchEventsInit() {
    runInAction(() => (this.fetchingInitEvents = true))

    const events = await MainApi.get('http://localhost:1339/current-events')

    runInAction(() => (this._events = events))
  }
}

export default new EventsStore()
