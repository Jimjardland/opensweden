/* eslint-disable */
import * as React from 'react'
import { observer } from 'mobx-react'
import { Button, Form, InputNumber } from 'antd'
import styled from 'styled-components'
import PlaceStore from '../stores/PlaceStore'
import Loader from './Loader'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

type Props = {
  form: Object
}

type State = {
  numbers: Array<number | void>
}

@observer
class ConfirmPasscode extends React.Component<Props, State> {
  state = {
    numbers: Array.from(new Array(6))
  }

  onChange = (e, index) => {
    const value = e.target.value
    if (isNaN(value)) {
      return
    }

    if (value.length > 1) {
      if (this.refs[index + 1]) {
        this.refs[index + 1].focus()
      }
      return
    }

    if (value.length === 1 && !isNaN(value)) {
      const numbers = this.state.numbers
      const newNumbers = numbers.map((n, i) => {
        if (i !== index) return n
        return parseInt(value)
      })

      this.setState(
        {
          numbers: newNumbers
        },
        () => {
          if (this.refs[index + 1]) {
            this.refs[index + 1].focus()
          }
        }
      )
    } else {
      const numbers = this.state.numbers
      const newNumbers = numbers.map((n, i) => {
        if (i !== index) return n
        return undefined
      })

      this.setState({
        numbers: newNumbers
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const code = parseInt(this.state.numbers.join(''))

    PlaceStore.confirmRoom(code)
      .then(() => {
        console.log('created')
      })
      .catch((e) => {
        console.log('###', e)
      })
  }

  inner() {
    const ints = Array.from(new Array(6)).map((_, i) => i)
    const { numbers } = this.state
    const canSubmit = numbers.filter((n) => !isNaN(n)).length === ints.length

    return (
      <form onSubmit={this.onSubmit} className="wrapper">
        <h2>Fyll i din kod</h2>
        <Wrapper>
          {ints.map((n, index) => (
            <input
              key={index}
              ref={index}
              autoFocus={index === 0}
              className="codeInput"
              value={numbers[index] !== undefined ? numbers[index] : ''}
              onChange={(e) => this.onChange(e, index)}
            />
          ))}
        </Wrapper>
        <Button
          type="primary"
          loading={PlaceStore.isBusy}
          disabled={!canSubmit}
          htmlType="submit"
        >
          Skicka
        </Button>
      </form>
    )
  }

  render() {
    return <div>{this.inner()}</div>
  }
}

export default ConfirmPasscode
