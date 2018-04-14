// @flow
import * as React from 'react'
import { featureCollection, point } from '@turf/helpers'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { accessToken, style } from '../config/mapbox'

mapboxgl.accessToken = accessToken

const Page = styled.div`
  height: 100vh;
`

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + s4() + s4()
}

const defaultCenter = [18.068859, 59.330297]

type Props = {
  children: React.Node,
  events: Array<Object>
}

type State = {
  mounted: boolean
}
export default class Map extends React.PureComponent<Props, State> {
  map: mapboxgl.Map
  events: []

  state = {
    mounted: false
  }

  componentWillReceiveProps(nextProps: Props) {
    setTimeout(() => {
      this.multipleCircles(nextProps.events)
    }, 500)
  }

  multipleCircles(locations: Array<Object>) {
    const points = locations.map((loc) =>
      point([loc.long, loc.lat], {
        radius: 50
      })
    )

    const id = guid()
    const circleId = `circle-${id}`

    this.map.addSource(id, {
      type: 'geojson',
      data: featureCollection(points)
    })

    this.map.addLayer({
      id: circleId,
      type: 'circle',
      source: id,
      paint: {
        'circle-radius': 50,
        'circle-color': 'red',
        'circle-blur': 0.3
      }
    })
  }

  setDangerPosition() {}

  onMapLoaded = () => {
    this.setState({ mounted: true })
    navigator.geolocation.getCurrentPosition((pos) => {
      this.map.jumpTo({
        center: [pos.coords.longitude, pos.coords.latitude]
      })
    })
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style,
      zoom: 11,
      minZoom: 10,
      maxZoom: 18,
      center: defaultCenter,
      pitch: 30
    })

    this.map.on('load', this.onMapLoaded)
  }
  render() {
    const { mounted } = this.state
    const { children } = this.props

    return <Page id="map">{mounted && children}</Page>
  }
}
