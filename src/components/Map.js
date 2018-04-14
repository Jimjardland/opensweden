// @flow
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'
import { lightMapboxUrl } from '../config/mapbox'

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
  places: Array<Object>,
  userPostion?: Array<number>,
  selectPlace: Function
}

type State = {
  mounted: boolean
}
export default class Map extends React.PureComponent<Props, State> {
  map: any
  container: ?Element
  events = []
  places = []
  userPos: any

  state = {
    mounted: false
  }

  setEvents = (locations: Array<Object>) => {
    locations.map((loc) => {
      const myIcon = Leaflet.divIcon({ className: 'event-circle' })
      // you can set .my-div-icon styles in CSS
      const event = Leaflet.marker([loc.lat, loc.long], { icon: myIcon }).addTo(
        this.map
      )

      // this.events.push(event)
      event.addTo(this.map)
    })
  }

  setPlaces = (places: Array<Object>) => {
    this.places.forEach((layer) => this.map.removeLayer(layer))

    places.map((loc) => {
      const place = Leaflet.circle([loc.lat, loc.long], {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: 50.0
      })
      place.on('click', () => {
        this.props.selectPlace(loc)
      })

      this.places.push(place)
      place.addTo(this.map)
    })
  }

  setUser = (userPostion?: Array<number>) => {
    if (this.userPos) {
      this.map.removeLayer(this.userPos)
    }

    if (userPostion) {
      const [lat, lng] = userPostion
      if (lat && lng) {
        const myIcon = Leaflet.divIcon({ className: 'person-circle' })
        // you can set .my-div-icon styles in CSS
        this.userPos = Leaflet.marker([lat, lng], { icon: myIcon })

        this.userPos.addTo(this.map)
      }
    }
  }

  componentDidUpdate() {
    this.setPlaces(this.props.places)
    this.setUser(this.props.userPostion)
  }

  onMapLoaded = () => {
    this.setState({ mounted: true })

    const goToDefaultCenter = () => {
      this.map.jumpTo({
        center: defaultCenter
      })
    }

    if (this.props.userPostion) {
      this.map.jumpTo({
        center: this.props.userPostion
      })
    } else {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.map.jumpTo({
            center: [pos.coords.longitude, pos.coords.latitude]
          })
        },
        goToDefaultCenter,
        options
      )
    }
  }

  onCreated = () => {
    this.setState({
      mounted: true
    })
    this.setEvents(this.props.events)
    this.setPlaces(this.props.places)
    this.setUser(this.props.userPostion)
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
