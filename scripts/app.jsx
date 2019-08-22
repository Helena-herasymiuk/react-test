import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import SignUp from 'SignUp'
import '../styles/main.scss'

class App extends Component {
  render() {
    return (
      <div className="app">
        <SignUp />
      </div>
    )
  }
}

export default hot(module)(App)