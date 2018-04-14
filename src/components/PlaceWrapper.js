// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import CreateOpenPlaceBooking from './CreateOpenPlaceBooking'
import ProgressStore from '../stores/ProgressStore'
import ConfirmPasscode from './ConfirmPasscode'

type Props = {}

@observer
export default class PlaceWrapper extends React.Component<Props> {
  render() {
    const { step } = ProgressStore

    if (step === 'start') {
      return <CreateOpenPlaceBooking />
    } else if (step === 'pending') {
      return <ConfirmPasscode />
    }

    return null
  }
}
