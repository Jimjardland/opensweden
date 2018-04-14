// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import PlaceStore from '../stores/PlaceStore'
import { Modal, Button } from 'antd'

type Props = {
  selected: ?Object
}

type State = {
  visible: boolean
}

const Row = styled.div``

@observer
export default class SelectedPlace extends React.PureComponent<Props, State> {
  state = { visible: false }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      visible: Boolean(nextProps.selected)
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })

    setTimeout(() => {
      PlaceStore.selectPlace()
    }, 500)
  }

  render() {
    const place = this.props.selected || {}
    const { visible } = this.state

    return (
      <Modal
        title={place.address}
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Stäng
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ marginLeft: 8 }}
            href={`tel:${place.phone_number}`}
          >
            Ring
          </Button>
        ]}
      >
        <Row>
          <b>Adress</b>
          <div>
            <div>{place.address}</div>
            <div>
              {place.city} {place.zip}
            </div>
          </div>
        </Row>

        <Row>
          <b>Telefonnummer</b>
          <div>
            <div>{place.phone_number}</div>
          </div>
        </Row>

        {place.extra && (
          <Row>
            <b>Meddelande</b>
            <div>
              <div>{place.extra}</div>
            </div>
          </Row>
        )}
      </Modal>
    )
  }
}
