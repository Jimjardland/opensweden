// @flow
import * as React from 'react'
import './numbers.css'

export default class Numbers extends React.Component {
  state = {
    numbers: [undefined, undefined, undefined, undefined, undefined, undefined]
  }

  onChange = (e, index) => {
    const value = e.target.value
    if (isNaN(value)) {
      console.log('STEÄNÄASNDÄ')
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

  render() {
    const ints = [0, 1, 2, 3, 4, 5]
    const { numbers } = this.state
    const canSubmit = numbers.filter((n) => !isNaN(n)).length === ints.length

    return (
      <div className="codePage">
        <h1 className="headerText">Fyll i din kod</h1>
        <h3 className="infoText">Levererades via sms</h3>
        <div className="theCode">
          {ints.map((n, index) => (
            <input
              key={index}
              ref={index}
              autoFocus={index === 0}
              value={numbers[index] !== undefined ? numbers[index] : ''}
              onChange={(e) => this.onChange(e, index)}
            />
          ))}
        </div>
        {canSubmit && <button className="sendButton">Skicka</button>}
      </div>
    )
  }
}
