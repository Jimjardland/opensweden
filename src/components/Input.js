// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'

const Field = styled.input`
  display: block;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  width: 100%;
  margin-bottom: 20px;
`

type Props = {
  onChange?: Function,
  placeholder?: string,
  value?: string
}

const Input = ({ onChange, value, placeholder }: Props) => (
  <AntInput
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
)

export default Input
