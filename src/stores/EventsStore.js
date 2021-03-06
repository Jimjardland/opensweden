// @flow

import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import { persist } from 'mobx-persist'
import MainApi from '../utils/MainApi'

type Event = {}

class EventsStore {
  @observable
  @persist('list')
  _events: Array<Event> = []
  @observable fetchingInitEvents: boolean = false

  get events(): Array<Event> {
    return this._events.slice()
  }

  @action
  async fetchEvents(init: boolean = false) {
    if (init) {
      runInAction(() => (this.fetchingInitEvents = true))
    }

    try {
      const events = await MainApi.get('/current-events/mock')

      runInAction(() => (this._events = events))
    } catch (e) {
      message.error('Kan inte hämta händelser')
      console.warn(e)
    } finally {
      runInAction(() => (this.fetchingInitEvents = false))
    }
  }
}

export default new EventsStore()
