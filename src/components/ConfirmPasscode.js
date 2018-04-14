// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import { Button, Form, InputNumber } from 'antd'
import styled from 'styled-components'
import PlaceStore from '../stores/PlaceStore'
import Input from './Input'
import Loader from './Loader'

type Props = {
  form: Object
}

type State = {}

@observer
class ConfirmPasscode extends React.Component<Props, State> {
  state = {
    code: ''
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, { code }) => {
      if (!err) {
        PlaceStore.confirmRoom(code)
          .then(() => {
            console.log('created')
          })
          .catch((e) => {
            console.log('###', e)
          })
      }
    })
  }

  inner() {
    if (PlaceStore.isBusy) {
      return <Loader />
    }

    const { form } = this.props

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item label={'Code'}>
          {form.getFieldDecorator('code', {
            validateTrigger: 'onBlur',
            rules: [
              {
                len: 6,
                message: 'Fyll i 6 siffror'
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Button htmlType="submit">Skicka</Button>
      </Form>
    )
  }

  render() {
    return (
      <div>
        <h2>Skriv in din passcode</h2>

        {this.inner()}
      </div>
    )
  }
}

export default Form.create({})(ConfirmPasscode)
