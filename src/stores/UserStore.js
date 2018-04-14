// @flow

import { observable, action, runInAction } from 'mobx'
import { persist } from 'mobx-persist'

class UserStore {
  @observable
  @persist('list')
  currentLocation: Array<number> = [59.3414562, 18.0635559]

  // constructor() {
  // const options = {
  //   enableHighAccuracy: true,
  //   timeout: 4000,
  //   maximumAge: 0
  // }

  // const locationSuccess = (pos) => {
  //   this.setUserPostion(pos.coords.latitude, pos.coords.longitude)
  // }

  // const error = () => {
  //   fetch(
  //     'http://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCp10yOGNtVJyKUtGN5-4eeW0SiypLOH4Q',
  //     { method: 'POST' }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log({ data })
  //       // return this.setUserPostion(data.lat, data.lon)
  //     })
  // }

  // navigator.geolocation.getCurrentPosition(locationSuccess, error, options)
  // navigator.geolocation.watchPosition(locationSuccess, error, options)
  // }

  @action
  setUserPostion(lat: number, lng: number) {
    this.currentLocation = [lat, lng]
  }
}

export default new UserStore()
