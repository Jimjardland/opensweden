// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Input as AntdInput } from 'antd'

const Field = styled.input`
  display: block;
`

type Props = {
  onChange: Function,
  placeholder: string,
  value?: string
}

const Input = ({ onChange, value }: Props) => (
  <AntdInput value={value} onChange={(e) => onChange(e.target.value)} />
)

export default Input
