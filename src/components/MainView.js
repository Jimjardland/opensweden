// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import MapContainer from '../containers/MapContainer'
import ActionButtons from './ActionButtons'
import BottomArea from './BottomArea'
import SelectedPlace from './SelectedPlace'
import PlaceStore from '../stores/PlaceStore'
import ProgressStore from '../stores/ProgressStore'
const Container = styled.div``

type Props = {}

@observer
export default class MainView extends React.Component<Props> {
  render() {
    return (
      <Container>
        <ActionButtons />
        <SelectedPlace selected={PlaceStore.selectedPlace} />
        <MapContainer>
          <BottomArea step={ProgressStore.step} />
        </MapContainer>
      </Container>
    )
  }
}
