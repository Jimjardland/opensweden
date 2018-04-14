// @flow

import * as React from 'react'
import MainView from './components/MainView'
import EventsStore from './stores/EventsStore'
import PlaceStore from './stores/PlaceStore'

type Props = {}

export default class App extends React.Component<Props> {
  componentDidMount() {
    EventsStore.fetchEventsInit()
    PlaceStore.fetchPlaces()
  }
  render() {
    if (EventsStore.fetchingInitEvents || PlaceStore.fetchingInitPlaces)
      return 'Loading...'

    return <MainView />
  }
}
