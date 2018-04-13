// @flow
import * as React from 'react'
import Map from '../components/Map'

type Props = {
  children: React.Node
}

export default class MapContainer extends React.Component<Props> {
  render() {
    return <Map>{this.props.children}</Map>
  }
}
