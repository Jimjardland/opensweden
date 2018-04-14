// @flow
import * as React from 'react'
import { featureCollection, point } from '@turf/helpers'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'
import { lightMapboxUrl } from '../config/mapbox'
import { findDOMNode } from 'react-dom'

const Page = styled.div`
  height: 100vh;
  position: relative;
  z-index: 2;
`

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + s4() + s4()
}

const defaultCenter = [59.330297, 18.068859]

type Props = {
  children: React.Node,
  events: Array<Object>,
  places: Array<Object>
}

type State = {
  mounted: boolean
}
export default class Map extends React.PureComponent<Props, State> {
  map: any
  container: ?Element
  events: []

  state = {
    mounted: false
  }

  setEvents = (locations: Array<Object>) => {
    locations.map((loc) => {
      const event = Leaflet.circle([loc.lat, loc.long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 150.0
      })
      // this.events.push(event)
      event.addTo(this.map)
    })
  }

  setPlaces = (places: Array<Object>) => {
    places.map((loc) => {
      const event = Leaflet.circle([loc.lat, loc.long], {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: 50.0
      })
      // this.events.push(event)
      event.addTo(this.map)
    })
  }

  onMapLoaded = () => {
    this.setState({ mounted: true })
    navigator.geolocation.getCurrentPosition((pos) => {
      this.map.jumpTo({
        center: [pos.coords.longitude, pos.coords.latitude]
      })
    })
  }

  onCreated = () => {
    this.setState({
      mounted: true
    })
    this.setEvents(this.props.events)
    this.setPlaces(this.props.places)
  }

  createMap = () => {
    this.map = Leaflet.map(this.container)
    this.map.setView(defaultCenter, 13)
    this.map.scrollWheelZoom.disable()

    Leaflet.tileLayer(lightMapboxUrl)
      .addTo(this.map)
      .on('load', () => {
        this.map.attributionControl.setPrefix(false)

        this.onCreated()
      })
  }

  componentDidMount() {
    this.createMap()
  }

  render() {
    const { mounted } = this.state
    const { children } = this.props

    return (
      <React.Fragment>
        <Page ref={(ref) => (this.container = findDOMNode(ref))} />
        {mounted && children}
      </React.Fragment>
    )
  }
}
