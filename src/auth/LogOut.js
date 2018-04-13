import React, { Component } from 'react';
import {
    View,
    Text,
  } from 'react-native';
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import { logOut } from '../actions'

class LogOut extends Component {

    logout() {
        Auth.signOut()
          .then(() => {
            this.props.dispatchLogout()
          })
          .catch(err => {
            console.log('err: ', err)
          })
      }

    render() {
        return (
            <View>
            <Text onPress={this.logout.bind(this)}>Logout</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  })
  
const mapDispatchToProps = {
dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);