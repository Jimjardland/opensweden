// @flow

import * as React from 'react'
import logo from './logo.svg'
import './App.css'

type Props = {}

class App extends React.Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get s11tarted, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
