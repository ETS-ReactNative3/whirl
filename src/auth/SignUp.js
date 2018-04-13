import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  ImageBackground
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
          // source={{url: 'https://source.unsplash.com/900x600/daily?nature'}}
          source = {require('../assets/DefaultBackground2.jpeg')}
          // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
          // source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
          // source = {require('../assets/DefaultBackground.jpg')}
          // source = {this.state.source}
          imageStyle={{resizeMode: 'cover'}}
          onLoadEnd={ ()=>{ this.setState({ loading: false })}}
      >
      <ActivityIndicator animating={ this.state.loading } size="large"/>
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
            placeholder="User Name"
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
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>
        {
          showSignUpConfirmationModal 
          && (
            <Modal>
              <View style={styles.modal}>
                <Text>
                  Please verify your email address by following the link in the email sent to you! You won't be able to use the app until you have done this.
                </Text>
                <Button
                  title='Confirm'
                  onPress={this.confirm.bind(this)}
                  isLoading={isAuthenticating}
                />
              </View>
            </Modal>
          )
        }
      </View>
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
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontFamily: fonts.base,
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
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
