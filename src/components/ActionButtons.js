// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'antd'

const Area = styled.div`
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 20;
  display: flex;
  flex-direction: column;
`

const Icon = styled(Button)`
  margin: 5px 0;
`

type Props = {}

type State = {
  selected?: string,
  open: boolean
}

export default class ActionButtons extends React.Component<Props, State> {
  state = {
    open: false
  }

  setOpen = (selected: string) => {
    this.setState({
      open: true,
      selected
    })
  }

  getInner(type: ?string) {
    if (type === 'info') {
      return (
        <div>
          <p>
            Utvecklades under{' '}
            <a target="_blank" href="https://hackforsweden.se/">
              Hack for Sweden 2018.
            </a>{' '}
            Mer information finns på{' '}
            <a target="_blank" href="https://github.com/Jimjardland/opensweden">
              GitHub
            </a>
          </p>
        </div>
      )
    } else if (type === 'safety') {
      return (
        <div>
          <p>Här kommer officella meddelanden listas från MSB.</p>
        </div>
      )
    } else if (type === 'help') {
      return (
        <div>
          <p>
            Har du några tips om vad som händer just nu? Kontakta polisen här
            via deras API.
          </p>
        </div>
      )
    }

    return ''
  }

  getTitle(type: ?string) {
    if (type === 'info') {
      return 'Information'
    } else if (type === 'safety') {
      return 'Officella meddelanden'
    } else if (type === 'help') return 'Tipsa polisen'

    return ''
  }

  handleCancel = () => {
    this.setState({ open: false })

    setTimeout(() => {
      this.setState({ selected: null })
    }, 500)
  }

  render() {
    return (
      <Area>
        <Modal
          title={this.getTitle(this.state.selected)}
          visible={Boolean(this.state.open)}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Stäng
            </Button>
          ]}
        >
          {this.getInner(this.state.selected)}
        </Modal>
        <Icon onClick={() => this.setOpen('info')} shape="circle" icon="info" />
        <Icon
          onClick={() => this.setOpen('safety')}
          shape="circle"
          icon="safety"
        />
        <Icon
          onClick={() => this.setOpen('help')}
          shape="circle"
          icon="exclamation"
        />
      </Area>
    )
  }
}
