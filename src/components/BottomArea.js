// @flow
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import anime from 'animejs'
import { primary } from '../config/colors'

const Container = styled.div`
  position: fixed;
  //   transform: translate(-50%, -50px);
  bottom: 50px;
  left: 50%;
  z-index: 10;
  opacity: 0;
`

const Button = styled.div`
  background-color: ${primary};
  border-radius: 4px;
  padding: 6px 12px;
`

type Props = {}

type State = {
  open: false
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
    return (
      <Container ref={(ref) => (this.container = ref)}>
        <Button>Öppna ditt hem</Button>
      </Container>
    )
  }
}
