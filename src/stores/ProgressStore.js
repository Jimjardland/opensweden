// @flow

import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class ProgressStore {
  @observable
  @persist
  step: 'start' | 'pending' | 'sharing' | 'open' = 'start'

  @action
  setStart = () => {
    this.step = 'start'
  }

  @action
  setPending = () => {
    this.step = 'pending'
  }

  @action
  setShared = () => {
    this.step = 'sharing'
  }

  @action
  setOpen = (open: boolean) => {
    this.step = open ? 'open' : 'start'
  }
}

export default new ProgressStore()
