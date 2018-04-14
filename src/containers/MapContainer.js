// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import Map from '../components/Map'
import EventsStore from '../stores/EventsStore'
import PlaceStore from '../stores/PlaceStore'

type Props = {
  children: React.Node
}

@observer
export default class MapContainer extends React.Component<Props> {
  render() {
    return (
      <Map places={PlaceStore.places} events={EventsStore.events}>
        {this.props.children}
      </Map>
    )
  }
}
