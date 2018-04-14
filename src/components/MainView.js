// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import MapContainer from '../containers/MapContainer'
import TipsContainer from '../containers/TipsContainer'
import BottomArea from './BottomArea'
import SelectedPlace from './SelectedPlace'
import PlaceStore from '../stores/PlaceStore'

const Container = styled.div``

type Props = {}

@observer
export default class MainView extends React.Component<Props> {
  render() {
    return (
      <Container>
        {false && <TipsContainer />}
        <SelectedPlace selected={PlaceStore.selectedPlace} />
        <MapContainer>
          <BottomArea />
        </MapContainer>
      </Container>
    )
  }
}
