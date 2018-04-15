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
    Promise.all([
      (EventsStore.fetchEvents(true), PlaceStore.fetchPlaces(true))
    ]).then(() => {
      const elem = document.getElementById('loading-screen')
      elem.classList.add('completed')
      setTimeout(() => {
        elem.remove()
      }, 300)
    })
  }
  render() {
    return <MainView />
  }
}
