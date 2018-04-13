// @flow
import * as React from 'react'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { accessToken } from '../config/mapbox'

mapboxgl.accessToken = accessToken

const Page = styled.div`
  height: 100vh;
`

const defaultCenter = [18.068859, 59.330297]

type Props = {}

class App extends React.Component<Props> {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jontis/cjfyb4vzm6hm02rob93cz4g4o',
      zoom: 11,
      minZoom: 10,
      maxZoom: 18,
      center: defaultCenter,
      pitch: 30
    })
  }
  render() {
    return <Page id="map" />
  }
}

export default App
