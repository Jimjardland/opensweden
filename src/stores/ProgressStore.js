// @flow

import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class ProgressStore {
  @observable
  @persist
  step: 'start' | 'pending' | 'sharing' = 'start'

  @action
  setPending = () => {
    this.step = 'pending'
  }

  @action
  setShared = () => {
    this.step = 'sharing'
  }
}

export default new ProgressStore()
