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

import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

import { fonts, colors } from '../theme';
import { createUser, confirmUserSignUp } from '../actions';

import Input from '../components/Input';
import Button from '../components/Button';

const initialState = {
  username: '',
  password: '',
  given_name: '',
  authCode: '',
  modalVisible: false,
  loading: true
};

class SignUp extends Component {
  state = initialState;

  onChangeText = (key, value) => {
    console.log(key + ' ' + value);
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
        style={styles.image}
        source={require('../assets/DefaultBackground3.jpg')}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Whirl</Text>
            </View>
            <Text style={styles.greeting2}>Sign up to continue</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputLineContainer}>
                <Input
                  placeholder="First Name"
                  type="given_name"
                  onChangeText={this.onChangeText}
                  value={this.state.given_name}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.inputLineContainer}>
                <Input
                  value={this.state.username}
                  placeholder="Email address"
                  type="username"
                  onChangeText={this.onChangeText}
                />
              </View>
              <View style={styles.inputLineContainer}>
                <Input
                  value={this.state.password}
                  placeholder="Password"
                  secureTextEntry
                  type="password"
                  onChangeText={this.onChangeText}
                />
              </View>
            </View>
            <Button
              title="Sign Up"
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

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontFamily: fonts.light,
    fontSize: 31,
    fontWeight: '300'
  },
  greeting2: {
    fontFamily: fonts.light,
    // color: '#a82167',
    color: colors.primary,
    textShadowColor: '#000000',
    textShadowRadius: 0.3,
    textShadowOffset: { width: 0.2, height: 0.2 },
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: -10
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'stretch'
  },
  inputLineContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary
  },
  title: {
    padding: 10,
    fontFamily: 'Billabong',
    fontSize: 60,
    fontWeight: '200',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowRadius: 0.3,
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});
