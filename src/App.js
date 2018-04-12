import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  TextInput,
  FlatList,
  Button,
  StatusBar
} from 'react-native';

// components
import Homescreen from './src/components/Homescreen/Homescreen';
import RequireName from './src/components/Homescreen/RequireName';

// src files
import Tabs from './auth/Tabs';
import Nav from './nav/Nav';

// AWS
import Amplify, { Auth } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config)

class App extends Component {
  state = {
    authCode: '',
  }

  signUp() {
    Auth.signUp({
      username:'C2P1@protonmail.com',
      password: '', // put a password here
      attributes: {
        given_name: 'C2P1',
      }
    })
    .then(res => {
      console.log('successful signup:', res)
    })
    .catch(err => {
      console.log('error signing up: ', err)
    })
  }

  confirmUser() {
    const { authCode } = this.state;
    Auth.confirmSignUp('user1', authCode)
    .then(res => {
      console.log('successful confirmation:', res)
    })
    .catch(err => {
      console.log('error confirming user: ', err)
    })
  }

  onChangeText(authCode) {
    this.setState({ authCode })
  }

  nameAddedHandler = (val) => {
    this.setState({
      name: val
    })
  }

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
    // const seenBefore = (this.state.name === '') ? (
    //   <RequireName onNameAdded={this.nameAddedHandler}/>
    // ) : (
    //   <Homescreen name={this.state.name}/>
    // )
    // return (
    //   <ImageBackground
    //       style={styles.image}
    //       // source={{url: 'https://source.unsplash.com/900x600/daily?landscape'}}
    //       // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
    //       // source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
    //       source = {require('./resources/img/DefaultBackground.jpg')}
    //       imageStyle={{resizeMode: 'cover'}}
    //   >
    //     <View style={styles.body}>
    //       {/* {seenBefore} */}
    //       <Button title='Sign Up' onPress={this.signUp.bind(this)}/>
    //       <TextInput
    //       placeholder='Input Code'
    //       onChangeText={value => this.onChangeText}
    //       style={styles.input}>
    //       </TextInput>
    //       <Button title='Confirm User' onPress={this.signUp.bind(this)}/>

    //     </View>
    //   </ImageBackground>
    // );
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


const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  },
  image: {
    flexGrow:1,
    height: null,
    width:null,
    alignItems: 'center',
  },
  body: {
    top: '40%',
  }
});



