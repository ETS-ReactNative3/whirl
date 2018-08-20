import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

import { AuthStyles } from './AuthTheme';

import { createUser, confirmUserSignUp } from '../actions';

import Input from '../components/Input';
import Button from '../components/Button';

const initialState = {
  username: null,
  password: null,
  given_name: null,
  authCode: '',
  modalVisible: false,
  loading: true
};

class SignUp extends Component {
  state = initialState;

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  signUp() {
    const { username, password, given_name } = this.state;
    this.props.dispatchCreateUser(username, password, given_name);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  confirm() {
    const { authCode, username } = this.state;
    this.props.dispatchConfirmUser(username, '12344');
  }

  componentWillReceiveProps(nextProps) {
    const {
      auth: { showSignUpConfirmationModal }
    } = nextProps;
    if (
      !showSignUpConfirmationModal &&
      this.props.auth.showSignUpConfirmationModal
    ) {
      this.setState(initialState);
    }
  }

  render() {
    const {
      auth: {
        showSignUpConfirmationModal,
        isAuthenticating,
        signUpError,
        signUpErrorMessage
      }
    } = this.props;

    return (
      <ImageBackground
        style={AuthStyles.image}
        source={require('../assets/AuthBackground.jpg')}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1 }}
        >
          <View style={AuthStyles.container}>
            <KeyboardAvoidingView behavior="position">
              <View style={{ alignItems: 'center' }}>
                <Text style={AuthStyles.title}>Whirl</Text>
              </View>
              <Text style={AuthStyles.greeting}>Sign up to continue</Text>

              <View style={AuthStyles.inputContainer}>
                <View style={AuthStyles.inputLineContainer}>
                  <Input
                    placeholder="First Name"
                    type="given_name"
                    onChangeText={this.onChangeText}
                    value={this.state.given_name}
                    autoCapitalize="words"
                  />
                </View>
                <View style={AuthStyles.inputLineContainer}>
                  <Input
                    value={this.state.username}
                    placeholder="Email address"
                    type="username"
                    onChangeText={this.onChangeText}
                    keyboadType="email-address"
                  />
                </View>
                <View style={AuthStyles.inputLineContainer}>
                  <Input
                    value={this.state.password}
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    onChangeText={this.onChangeText}
                    onSubmitEditing={() => this.signUp.bind(this)}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>

            <Button
              title="Sign Up"
              onPress={this.signUp.bind(this)}
              isLoading={isAuthenticating}
              disabled={
                !this.state.username ||
                !this.state.password ||
                !this.state.given_name
              }
            />

            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}
                style={{ alignItems: 'center' }}
              >
                <View style={AuthStyles.button}>
                  <Text style={AuthStyles.buttonText}>Back to Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  dispatchConfirmUser: (username, authCode) =>
    confirmUserSignUp(username, authCode),
  dispatchCreateUser: (username, password, given_name) =>
    createUser(username, password, given_name)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
