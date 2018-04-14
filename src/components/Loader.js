// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Icon, Spin } from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const Loader = () => <Spin indicator={antIcon} />

export default Loader
