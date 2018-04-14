// @flow

import { observable, action, runInAction } from 'mobx'
import { persist } from 'mobx-persist'
import { message } from 'antd'
import MainApi from '../utils/MainApi'
import ProgressStore from './ProgressStore'

type Event = {}

class PlaceStore {
  @observable
  @persist('list')
  _places: Array<Event> = []
  @observable fetchingInitPlaces: boolean = false
  @observable isBusy: boolean = false

  @observable
  @persist
  confirmId: ?string

  @observable selectedPlace: ?Object

  get places(): Array<Event> {
    return this._places ? this._places.slice() : []
  }

  @action
  async createPlace(data: Object) {
    runInAction(() => (this.isBusy = true))

    try {
      const { id } = await MainApi.post('/add-place', data)
      runInAction(() => (this.confirmId = id))
    } catch (e) {
      message.error(e.message || 'Kan inte skapa rum')
      console.warn(e)
      throw e
    } finally {
      runInAction(() => (this.isBusy = false))
    }
  }

  @action
  async confirmRoom(code: number) {
    runInAction(() => (this.isBusy = true))

    try {
      await MainApi.post('/publish-place', {
        code,
        id: this.confirmId
      })
      ProgressStore.setShared()
      this.fetchPlaces()
    } catch (e) {
      message.error(e.message || 'Kan inte skapa rum')
      console.warn(e)
      throw e
    } finally {
      runInAction(() => (this.isBusy = false))
    }
  }

  @action
  async fetchPlaces(init: boolean = false) {
    if (init) {
      runInAction(() => (this.fetchingInitPlaces = true))
    }

    const places = await MainApi.get('/get-available-places/mock')
    runInAction(() => {
      this._places = places
      this.fetchingInitPlaces = false
    })
  }

  @action
  selectPlace = (selected: ?Object | void) => {
    this.selectedPlace = selected
  }
}

export default new PlaceStore()
