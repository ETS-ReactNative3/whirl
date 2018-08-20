import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

import { authenticate, confirmUserLogin } from '../actions';
import { AuthStyles } from './AuthTheme';

import Input from '../components/Input';
import Button from '../components/Button';

class SignIn extends Component {
  state = {
    username: null,
    password: null
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  signIn() {
    const { username, password } = this.state;
    this.props.dispatchAuthenticate(username, password);
  }

  confirm() {
    const { authCode } = this.state;
    this.props.dispatchConfirmUserLogin(authCode);
  }

  render() {
    const { fontsLoaded } = this.state;
    const {
      auth: {
        signInErrorMessage,
        isAuthenticating,
        signInError,
        showSignInConfirmationModal
      }
    } = this.props;

    console.log('SignInError: ', signInError);

    return (
      <ImageBackground
        style={AuthStyles.image}
        source={require('../assets/AuthBackground.jpg')}
        // imageStyle={{ resizeMode: 'cover' }}
        blurRadius={1}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
              <View style={{ alignItems: 'center' }}>
                <Text style={AuthStyles.title}>Whirl</Text>
              </View>
              <View style={AuthStyles.inputContainer}>
                <View style={AuthStyles.inputLineContainer}>
                  <Input
                    placeholder="Email Address"
                    type="username"
                    onChangeText={this.onChangeText}
                    value={this.state.username}
                    keyboadType="email-address"
                  />
                </View>
                <View style={AuthStyles.inputLineContainer}>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChangeText={this.onChangeText}
                    value={this.state.password}
                    secureTextEntry
                  />
                </View>
              </View>
            </KeyboardAvoidingView>

            <Button
              isLoading={isAuthenticating}
              title="Login"
              onPress={this.signIn.bind(this)}
              style={AuthStyles.button}
              disabled={!this.state.username || !this.state.password}
            />
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                style={{ alignItems: 'center' }}
              >
                <View style={AuthStyles.button}>
                  <Text style={AuthStyles.buttonText}>
                    Forgot your password?
                  </Text>
                </View>
              </TouchableOpacity>
              <View />
              <View style={AuthStyles.spacer} />

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}
                style={{ alignItems: 'center' }}
              >
                <View style={AuthStyles.button}>
                  <Text style={[AuthStyles.buttonText]}>
                    Don't have an account yet?
                    {'   '}
                  </Text>
                  <Text style={[AuthStyles.buttonText, styles.SignUpText]}>
                    Create one.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = {
  dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
  dispatchAuthenticate: (username, password) => authenticate(username, password)
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  SignUpText: {
    color: '#118CDD'
  }
});
