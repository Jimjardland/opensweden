// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import Map from '../components/Map'
import EventsStore from '../stores/EventsStore'
import PlaceStore from '../stores/PlaceStore'
import UserStore from '../stores/UserStore'

type Props = {
  children: React.Node
}

@observer
export default class MapContainer extends React.Component<Props> {
  componentDidMount() {
    // setInterval(() => {
    //   EventsStore.fetchEvents()
    //   PlaceStore.fetchPlaces()
    // }, 3000)
  }
  render() {
    return (
      <Map
        userPostion={UserStore.currentLocation}
        places={PlaceStore.places}
        selectPlace={PlaceStore.selectPlace}
        events={EventsStore.events}
      >
        {this.props.children}
      </Map>
    )
  }
}
