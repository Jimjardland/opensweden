// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import CreateOpenPlaceBooking from './CreateOpenPlaceBooking'
import PlaceStore from '../stores/PlaceStore'
import ConfirmPasscode from './ConfirmPasscode'
import { Modal, Button } from 'antd'

type Props = {}

@observer
export default class SelectedPlace extends React.Component<Props> {
  handleOk = (e) => {}

  handleCancel = (e) => {
    PlaceStore.selectPlace()
  }

  render() {
    const { selectedPlace } = PlaceStore
    const visible = Boolean(selectedPlace)
    const place = selectedPlace || {}

    return (
      <Modal
        title={place.address}
        visible={visible}
        onOk={this.handleOk}
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
            onClick={this.handleOk}
          >
            Ring
          </Button>
        ]}
      >
        <b>Adress:</b>
        <div>
          <div>{place.address}</div>
          <div>
            {place.city} {place.zip}
          </div>
        </div>
        <b>Telefonnummer</b>
        <div>
          <div>{place.phone_number}</div>
        </div>
      </Modal>
    )
  }
}
