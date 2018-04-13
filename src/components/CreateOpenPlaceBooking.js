// @flow
import * as React from 'react'
import styled from 'styled-components'
import Input from './Input'

type Props = {
  onSubmit: Function
}

const Form = styled.form`
  display: block;
`

type State = {
  phoneNumber?: string
}

export default class CreateOpenPlaceBooking extends React.Component<
  Props,
  State
> {
  state = {}

  setFieldValue = (val: string, field: string) => {
    this.setState({
      [field]: val
    })
  }

  onSubmit() {}

  render() {
    return (
      <Form>
        <Input
          value={this.state.phoneNumber}
          onChange={(val) => this.setFieldValue(val, 'phoneNumber')}
        />
        <Input
          value={this.state.address}
          onChange={(val) => this.setFieldValue(val, 'address')}
        />
      </Form>
    )
  }
}
