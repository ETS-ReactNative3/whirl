import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,  
} from 'react-native';

import { connect } from 'react-redux';
import Amplify, { Auth, API } from 'aws-amplify';
import aws_exports from './aws-exports';

import Tabs from './auth/Tabs';
import Nav from './nav/Nav';

class App extends Component {
  state = {
    user: {},
    isLoading: true
  }
  async componentDidMount() {
    StatusBar.setHidden(true)
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user, isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }
  render() {
    if (this.state.isLoading) return null
    let loggedIn = false
    if (this.state.user.username) {
      loggedIn = true
    }
    if (loggedIn) {
      return (
        <Nav />
      )
    }
    return (
      <Tabs />
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)



