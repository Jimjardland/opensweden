// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import MainView from './components/MainView'
import EventsStore from './stores/EventsStore'
import PlaceStore from './stores/PlaceStore'
import UserStore from './stores/UserStore'

type Props = {}

@observer
export default class App extends React.Component<Props> {
  componentDidMount() {
    EventsStore.fetchEvents(true)
    PlaceStore.fetchPlaces(true)

    function locationSuccess(pos) {
      UserStore.setUserPostion(pos.coords.latitude, pos.coords.longitude)
    }

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message)
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(locationSuccess, error, options)
    navigator.geolocation.watchPosition(locationSuccess, error, options)
  }
  render() {
    if (EventsStore.fetchingInitEvents || PlaceStore.fetchingInitPlaces)
      return 'Loading...'

    return <MainView />
  }
}
