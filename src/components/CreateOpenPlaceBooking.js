// @flow
import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Form, Button } from 'antd'
import FormField from './FormField'
import PlaceStore from '../stores/PlaceStore'
import ProgressStore from '../stores/ProgressStore'
import Loader from './Loader'
import './form.css'

type Props = {
  form: Object,
  onCancel: Function
}

@observer
class CreateOpenPlaceBooking extends React.Component<Props> {
  onSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        PlaceStore.createPlace(values).then(ProgressStore.setPending)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { onCancel } = this.props

    if (PlaceStore.isBusy) return <Loader />

    const fields = [
      {
        label: 'Telefonnummer',
        name: 'phoneNumber',
        initialValue: '0703679949'
      },
      {
        label: 'Adress',
        name: 'address',
        initialValue: 'Riddargatan 26'
      },
      {
        label: 'Zip',
        name: 'zip',
        initialValue: '11457'
      },
      {
        label: 'Ort',
        name: 'city',
        initialValue: 'Stockholm'
      }
    ]
    return (
      <Form className="bookForm" onSubmit={this.onSubmit}>
        {fields.map((f) =>
          getFieldDecorator(f.name, {
            initialValue: f.initialValue,
            rules: [
              {
                required: true,
                message: 'Fält är obligatoriskt'
              }
            ]
          })(<FormField placeholder={f.label} />)
        )}

        <Button style={{ marginRight: 8 }} onClick={onCancel}>
          Ångra
        </Button>
        <Button type="primary" htmlType="submit">
          Skicka
        </Button>
      </Form>
    )
  }
}

export default Form.create({})(CreateOpenPlaceBooking)
