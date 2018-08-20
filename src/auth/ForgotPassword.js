import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { Auth } from 'aws-amplify';
import Input from '../components/Input';
import Button from '../components/Button';

import { AuthStyles } from './AuthTheme';

import { AuthExceptions } from './AuthExceptions';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { delivery: null };
  }

  send() {
    const { username } = this.state;
    if (!username) {
      Alert('Username cannot be empty');
      return;
    }
    Auth.forgotPassword(username)
      .then(data => {
        this.setState({ delivery: data.CodeDeliveryDetails });
        Alert.alert(
          'A code has been emailed to you',
          'Remember to check your junk mail!'
        );
      })
      .catch(err => {
        msg = AuthExceptions(err);
        Alert.alert('Error', msg);
      });
  }

  submit() {
    const { username, code, password } = this.state;
    Auth.forgotPasswordSubmit(username, code, password)
      .then(data => {
        console.log(data);
        Alert.alert('Password successfully changed!');
        this.props.navigation.navigate('SignIn');
      })
      .catch(err => console.log(err));
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  forgotBody() {
    return (
      <View>
        <View alignContent="center">
          <Text style={AuthStyles.greeting}>
            Have a code emailed to you to set a new password
          </Text>
        </View>
        <View style={AuthStyles.spacer} />

        <View style={AuthStyles.inputLineContainer}>
          <Input
            type="username"
            onChangeText={this.onChangeText}
            placeholder="Email Address"
            value={this.state.username}
            keyboadType="email-address"
          />
        </View>
        <Button
          title="Send Code"
          onPress={() => this.send()}
          style={AuthStyles.button}
          disabled={!this.state.username}
        />
        <View style={AuthStyles.spacer} />

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
    );
  }

  submitBody() {
    return (
      <View>
        <View alignContent="center">
          <Text style={AuthStyles.greeting}>
            Input the code that was emailed to you
          </Text>
        </View>
        <View style={AuthStyles.spacer} />
        <View style={AuthStyles.inputLineContainer}>
          <Input
            autoFocus={false}
            type="code"
            onChangeText={this.onChangeText}
            placeholder="Code"
            value={this.state.code}
            keyboadType="numeric"
          />
        </View>
        <View style={AuthStyles.inputLineContainer}>
          <Input
            autoFocus={false}
            type="password"
            onChangeText={this.onChangeText}
            placeholder="New Password"
            value={this.state.password}
            secureTextEntry
          />
        </View>
        <Button
          title="Submit"
          onPress={() => this.submit()}
          style={AuthStyles.button}
          disabled={!this.state.username}
        />
        <View style={AuthStyles.spacer} />

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
    );
  }

  render() {
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
            {this.state.delivery ? this.submitBody() : this.forgotBody()}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}
