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
import classNames from 'classnames'

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

    const fields = [
      {
        label: 'Telefonnummer',
        name: 'phoneNumber',
        initialValue: '0734119576'
      },
      {
        label: 'Adress',
        name: 'address',
        initialValue: 'Kungsgatan 44'
      },
      {
        label: 'Zip',
        name: 'zip',
        initialValue: '11137'
      },
      {
        label: 'Ort',
        name: 'city',
        initialValue: 'Stockholm'
      }
    ]
    return (
      <Form className={classNames('wrapper')} onSubmit={this.onSubmit}>
        <h2>Dina uppgifter</h2>
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

        {getFieldDecorator('extras', {
          rules: [
            {
              required: true,
              message: 'Fält är obligatoriskt'
            }
          ]
        })(<FormField type="textarea" placeholder="Meddelande" />)}

        <Button style={{ marginRight: 8 }} onClick={onCancel}>
          Ångra
        </Button>
        <Button type="primary" loading={PlaceStore.isBusy} htmlType="submit">
          Skicka
        </Button>
      </Form>
    )
  }
}

export default Form.create({})(CreateOpenPlaceBooking)
