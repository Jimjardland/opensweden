// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Form, Button } from 'antd'
import Input from './Input'

type Props = {
  form: Object,
  onSubmit: Function
}

type State = {
  phoneNumber?: string
}

class CreateOpenPlaceBooking extends React.Component<Props, State> {
  state = {}

  setFieldValue = (val: string, field: string) => {
    this.setState({
      [field]: val
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      console.log({ err, values })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item label="Telefonnummer">
          {getFieldDecorator('phoneNumber', {
            rules: [
              {
                required: true,
                message: 'Fält är obligatoriskt'
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Adress">
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Fält är obligatoriskt'
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Button htmlType="submit">Skicka</Button>
      </Form>
    )
  }
}

export default Form.create({})(CreateOpenPlaceBooking)
