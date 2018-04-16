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
    this.events.forEach((layer) => this.map.removeLayer(layer))

    locations.map((loc) => {
      const myIcon = Leaflet.divIcon({ className: 'event-circle' })
      // you can set .my-div-icon styles in CSS
      const event = Leaflet.marker([loc.lat, loc.long], {
        iconSize: [100, 100],
        icon: myIcon
      }).addTo(this.map)

      this.events.push(event)
      event.addTo(this.map)
    })
  }

  setPlaces = (places: Array<Object>) => {
    this.places.forEach((layer) => this.map.removeLayer(layer))

    places.map((loc) => {
      const myIcon = Leaflet.divIcon({
        className: 'place-circle'
      })
      const place = Leaflet.marker([loc.lat, loc.long], { icon: myIcon })
      place.addTo(this.map)

      place.on('click', () => {
        this.props.selectPlace(loc)
      })

      this.places.push(place)
      place.addTo(this.map)
    })
  }

  setUser = (userPostion?: Array<number>) => {
    // let isFirst = false
    // if (this.userPos) {
    //   this.map.removeLayer(this.userPos)
    // } else {
    //   isFirst = true
    // }
    // if (userPostion) {
    //   const [lat, lng] = userPostion
    //   if (lat && lng) {
    //     const myIcon = Leaflet.divIcon({
    //       className: 'person-circle'
    //     })
    //     this.userPos = Leaflet.marker([lat, lng], { icon: myIcon })
    //     this.userPos.addTo(this.map)
    //     if (isFirst) {
    //       this.map.setView([lat, lng])
    //     }
    //   }
    // }
  }

  componentDidUpdate() {
    this.setPlaces(this.props.places)
    this.setUser(this.props.userPostion)
  }

  onMapLoaded = () => {
    this.setState({ mounted: true })

    const goToDefaultCenter = () => {
      this.map.setView(defaultCenter)
    }

    if (this.props.userPostion) {
      this.map.setView(this.props.userPostion)
    } else {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.map.setView([pos.coords.longitude, pos.coords.latitude])
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
