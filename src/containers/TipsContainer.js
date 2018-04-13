// @flow
import * as React from 'react'
import TipsIcon from '../components/TipsIcon'

type Props = {}

export default class TipsContainer extends React.Component<Props> {
  onClick() {}

  render() {
    return <TipsIcon onClick={this.onClick} />
  }
}
