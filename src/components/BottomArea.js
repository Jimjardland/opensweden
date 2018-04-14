// @flow
import * as React from 'react'
import { Icon, Button } from 'antd'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import anime from 'animejs'
import { primary, red } from '../config/colors'
import classNames from 'classnames'
import ProgressStore from '../stores/ProgressStore'
import { observer } from 'mobx-react'
import CreateOpenPlaceBooking from './CreateOpenPlaceBooking'
import ConfirmPasscode from './ConfirmPasscode'

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0;
  z-index: 10;
  width: 100%;
  opacity: 1;
  display: flex;
  justify-content: center;
`

const Sharing = styled.h2`
  color: #ffaf40;
  display: block;
  font-size: 30px;
  text-align: center;
`

type Props = {
  step: string
}

type State = {
  faded: boolean,
  step: string
}

@observer
export default class BottomArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      faded: false,
      step: props.step
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.step !== this.props.step) {
      this.setState({
        faded: true
      })

      setTimeout(() => {
        this.setState({
          step: nextProps.step
        })
      }, 240)

      setTimeout(() => {
        this.setState({
          faded: false
        })
      }, 240)
    }
  }

  setOpen(open: boolean) {
    ProgressStore.setOpen(open)
  }

  render() {
    const { step, faded } = this.state
    let inner = null

    let options = {}
    if (step === 'sharing') {
      return (
        <Container>
          <Sharing>Du erbjuder nu skydd</Sharing>
        </Container>
      )
    } else if (step === 'pending') {
      options = {
        className: 'bottom-password'
      }
      inner = <ConfirmPasscode />
    } else if (step === 'start') {
      options = {
        className: 'bottom-start',
        onClick: () => {
          this.setOpen(true)
        }
      }
      inner = <div className="open-button">Erbjud skydd</div>
    } else if (step === 'open') {
      options = {
        className: 'bottom-open'
      }
      inner = <CreateOpenPlaceBooking onCancel={() => this.setOpen(false)} />
    }

    const { className, ...rest } = options

    return (
      <Container>
        <div className={classNames('morph', className)} {...rest}>
          <div
            className="content"
            style={{
              opacity: faded ? 0 : 1
            }}
          >
            {inner}
          </div>
        </div>
      </Container>
    )
  }
}
