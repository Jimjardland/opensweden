// @flow
import * as React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  position: fixed;
  right: 50px;
  top: 50px;
  border-radius: 50%;
  background: white;
  width: 50px;
  height: 50px;
  z-index: 10;
`

type Props = {
  onClick: Function
}

const TipsIcon = (props: Props) => <Icon />

export default TipsIcon
