// @flow
import { AppContainer } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import client from './ApolloClient'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing root dom')
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
    </AppContainer>,
    root
  )
}

render(App)

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
