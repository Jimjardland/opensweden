// @flow
import * as React from 'react'
import { Icon } from 'antd'
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
  cursor: ${({ open }) => (open ? 'auto' : 'pointer')};
`

const Inner = styled.div`
  transition: opacity 0.25s ease;
  opacity: ${({ faded }) => (faded ? 0 : 1)};
  display: flex;
  flex-direction: columns;
  align-items: center;
  height: 100%;
  position: relative;
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

export default class BottomArea extends React.Component<Props, State> {
  state = {
    open: false,
    faded: false
  }

  open: boolean = false
  container: ?HTMLElement

  setOpen = () => {
    this.setState(
      {
        faded: true
      },
      () =>
        anime({
          targets: this.container,
          width: 400,
          height: 490,
          opacity: 1,
          complete: () => {
            this.setState({
              faded: false,
              open: true
            })
          }
        })
    )
  }

  setClosed = () => {
    this.setState(
      {
        faded: true
      },
      () =>
        anime({
          targets: this.container,
          width: 120,
          height: 45,
          opacity: 1,
          complete: () => {
            this.setState({
              faded: false,
              open: false
            })
          }
        })
    )
  }

  componentDidMount() {
    anime({
      targets: this.container,
      translateX: '-50%',
      //   transform: 'translate(-50%, 0)',
      opacity: 1
    })
  }

  render() {
    const { faded, open } = this.state
    return (
      <Container
        onClick={!open ? this.setOpen : () => {}}
        open={open}
        ref={(ref) => (this.container = findDOMNode(ref))}
      >
        <Inner faded={faded}>
          {open && (
            <React.Fragment>
              <Close type="close" onClick={this.setClosed} />
              <CreateOpenPlaceBookingContainer />
            </React.Fragment>
          )}
          {!open && 'Öppna ditt hem'}
        </Inner>
      </Container>
    )
  }
}
