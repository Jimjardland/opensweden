// @flow
import * as React from 'react'
import { Icon, Button } from 'antd'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import anime from 'animejs'
import { primary, red } from '../config/colors'
import PlaceWrapper from './PlaceWrapper'
import ProgressStore from '../stores/ProgressStore'
import { observer } from 'mobx-react'
import CreateOpenPlaceBooking from './CreateOpenPlaceBooking'
import ConfirmPasscode from './ConfirmPasscode'

const Container = styled.div`
  position: fixed;
  transform: translate(-50%, -50px);
  bottom: 50px;
  left: 50%;
  z-index: 10;
  opacity: 1;
`

const Sharing = styled.div`
  padding: 20px;
  background: ${red};
`

const Close = styled(Icon)`
  position: absolute;
  right: 5px;
  top: 5px;
  color: white;
  cursor: pointer;
`

type Props = {}

type State = {
  open: boolean,
  faded: boolean
}

@observer
export default class BottomArea extends React.Component<Props, State> {
  state = {
    open: false,
    faded: false
  }

  render() {
    const { step } = ProgressStore
    const { open } = this.state
    let inner = null

    if (step === 'sharing') {
      inner = <Sharing>Du delar din plats</Sharing>
    } else if (step === 'pending') {
      inner = <ConfirmPasscode />
    } else if (!open) {
      inner = (
        <Button type="primary" onClick={() => this.setState({ open: true })}>
          Bjud in
        </Button>
      )
    } else if (step === 'start') {
      inner = (
        <CreateOpenPlaceBooking
          onCancel={() => this.setState({ open: false })}
        />
      )
    }

    return <Container>{inner}</Container>
  }
}
