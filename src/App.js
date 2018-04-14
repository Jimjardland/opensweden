// @flow

import * as React from 'react'
import MainView from './components/MainView'
import EventsStore from './stores/EventsStore'

type Props = {}

export default class App extends React.Component<Props> {
  componentDidMount() {
    EventsStore.fetchEventsInit()
  }
  render() {
    return <MainView />
  }
}
