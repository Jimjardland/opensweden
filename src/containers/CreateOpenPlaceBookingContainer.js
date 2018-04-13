// @flow
import * as React from 'react'
import CreateOpenPlaceBooking from '../components/CreateOpenPlaceBooking'

type Props = {}

export default class CreateOpenPlaceBookingContainer extends React.Component<
  Props
> {
  onSubmit() {}

  render() {
    return <CreateOpenPlaceBooking onSubmit={this.onSubmit} />
  }
}
