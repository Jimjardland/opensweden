// @flow
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { create } from 'mobx-persist'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import stores from './stores'

const hydrate = create()

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing root dom')
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

const init = async () => {
  const rehydrates = stores.map((store, i) => hydrate(i, store))
  await Promise.all(rehydrates)
  render(App)
}

init()

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
}

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
