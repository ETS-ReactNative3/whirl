import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'

import { fonts, colors } from '../theme'
import { createUser, confirmUserSignUp } from '../actions'

import Input from '../components/Input'
import Button from '../components/Button'

const initialState = {
  username: '',
  password: '',
  given_name: '',
  authCode: '',
  modalVisible: false,
  loading: true,
}

class SignUp extends Component {
  state = initialState

  onChangeText = (key, value) => {
    console.log(key + " " + value)
    this.setState({
      [key]: value
    })
  }

  signUp() {
    const { username, password, given_name } = this.state
    this.props.dispatchCreateUser(username, password, given_name)
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  confirm() {
    const { authCode, username } = this.state
    this.props.dispatchConfirmUser(username, '12344')
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { showSignUpConfirmationModal }} = nextProps
    if (!showSignUpConfirmationModal && this.props.auth.showSignUpConfirmationModal) {
      this.setState(initialState)
    }
  }

  render() {
    const { auth: {
      showSignUpConfirmationModal,
      isAuthenticating,
      signUpError,
      signUpErrorMessage
    }} = this.props
    
    return (
      <ImageBackground
          style={styles.image}
          source = {require('../assets/DefaultBackground2.jpeg')}
          imageStyle={{resizeMode: 'cover'}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.greeting}>
              Welcome,
            </Text>
            <Text style={styles.greeting2}>
              sign up to continue
            </Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputLineContainer}>
                <Input
                    placeholder="First Name"
                    type='given_name'
                    onChangeText={this.onChangeText}
                    value={this.state.given_name}
                />
              </View>
              <View style={styles.inputLineContainer}>
                <Input
                  value={this.state.username}
                  placeholder="Email address"
                  type='username'
                  onChangeText={this.onChangeText}
                />
              </View>
              <View style={styles.inputLineContainer}>
                <Input
                  value={this.state.password}
                  placeholder="Password"
                  secureTextEntry
                  type='password'
                  onChangeText={this.onChangeText}
                />
              </View>
            </View>
            <Button
              title='Sign Up'
              onPress={this.signUp.bind(this)}
              isLoading={isAuthenticating}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchConfirmUser: (username, authCode) => confirmUserSignUp(username, authCode),
  dispatchCreateUser: (username, password, given_name) => createUser(username, password, given_name)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontFamily: fonts.light,
    fontSize: 24
  },
  greeting2: {
    fontFamily: fonts.light,
    color: '#666',
    fontSize: 24,
    marginTop: 5
  },
  image: {
    flexGrow:1,
    height: null,
    width:null,
    alignItems: 'stretch',
  },
  inputLineContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
