// @flow

import * as React from 'react'
import styled from 'styled-components'
import MapContainer from './containers/MapContainer'

const Container = styled.div``

type Props = {}

class App extends React.Component<Props> {
  render() {
    return (
      <Container>
        <MapContainer />
      </Container>
    )
  }
}

export default App
