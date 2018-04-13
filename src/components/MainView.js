// @flow

import * as React from 'react'
import styled from 'styled-components'
import MapContainer from '../containers/MapContainer'
import TipsContainer from '../containers/TipsContainer'
import BottomArea from './BottomArea'

const Container = styled.div``

type Props = {}

export default class MainView extends React.Component<Props> {
  render() {
    return (
      <Container>
        <TipsContainer />
        <MapContainer>
          <BottomArea />
        </MapContainer>
      </Container>
    )
  }
}
