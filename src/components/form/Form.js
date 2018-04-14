// @flow

import * as React from 'react'
import './form.css'

export default class Form extends React.Component {
  render() {
    return (
        <div className="form">
            <h1 className="headerText">Öppna ditt hem</h1>
            <div className="inputFields">
                <div className="field">
                    <input
                    placeholder={'Telefonnummer'}
                    />
                    <span className="focus-input"></span>
                </div>
                <div className="field">
                    <input
                    placeholder={'Adress'}
                    />
                    <span className="focus-input"></span>
                </div>
                <div className="field">
                    <input
                    placeholder={'Postnummer'}
                    />
                    <span className="focus-input"></span>
                </div>
                <div className="field">
                    <input
                    placeholder={'Stad'}
                    />
                    <span className="focus-input"></span>
                </div>
                    <div className="field">
                        <input
                        placeholder={'Meddelande'}
                        />
                        <span className="focus-input"></span>
                    </div>
            </div>
            <button className="sendButton">Skicka</button>
    </div>
    )
  }
}
