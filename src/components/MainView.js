// @flow

import * as React from 'react'
import styled from 'styled-components'
import MapContainer from '../containers/MapContainer'
import TipsContainer from '../containers/TipsContainer'
import BottomArea from './BottomArea'
import SelectedPlace from './SelectedPlace'

const Container = styled.div``

type Props = {}

export default class MainView extends React.Component<Props> {
  render() {
    return (
      <Container>
        {false && <TipsContainer />}
        <SelectedPlace />
        <MapContainer>
          <BottomArea />
        </MapContainer>
      </Container>
    )
  }
}
