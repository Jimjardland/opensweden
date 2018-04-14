// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import MainView from './components/MainView'
import EventsStore from './stores/EventsStore'
import PlaceStore from './stores/PlaceStore'

type Props = {}

@observer
export default class App extends React.Component<Props> {
  componentDidMount() {
    EventsStore.fetchEvents(true)
    PlaceStore.fetchPlaces(true)
  }
  render() {
    if (EventsStore.fetchingInitEvents || PlaceStore.fetchingInitPlaces)
      return 'Loading...'

    return <MainView />
  }
}
