// @flow
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import anime from 'animejs'
import { primary } from '../config/colors'
import CreateOpenPlaceBookingContainer from '../containers/CreateOpenPlaceBookingContainer'

const Container = styled.div`
  position: fixed;
  transform: translate(-50%, -50px);
  bottom: 50px;
  left: 50%;
  z-index: 10;
  opacity: 0;
  background-color: ${primary};
  border-radius: 4px;
  padding: 12px;
`

const Button = styled.div`
  padding: 6px 12px;
  padding: 0;
  cursor: pointer;
`

type Props = {}

type State = {
  open: boolean
}

export default class BottomArea extends React.Component<Props, State> {
  state = {
    open: false
  }

  componentDidMount() {
    console.log(this.container)
    anime({
      targets: findDOMNode(this.container),
      translateX: '-50%',
      //   transform: 'translate(-50%, 0)',
      opacity: 1
    })
  }

  render() {
    const { open } = this.state

    return (
      <Container ref={(ref) => (this.container = ref)}>
        {!open ? (
          <Button onClick={() => this.setState({ open: true })}>
            Öppna ditt hem
          </Button>
        ) : (
          <CreateOpenPlaceBookingContainer />
        )}
      </Container>
    )
  }
}
