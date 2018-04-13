// @flow
import * as React from 'react'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { accessToken, style } from '../config/mapbox'

mapboxgl.accessToken = accessToken

const Page = styled.div`
  height: 100vh;
`

const defaultCenter = [18.068859, 59.330297]

type Props = {
  children: React.Node
}

type State = {
  mounted: boolean
}
export default class Map extends React.Component<Props, State> {
  map: mapboxgl.Map

  state = {
    mounted: false
  }

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
