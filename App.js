import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  TextInput,
  FlatList
} from 'react-native';




export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Conor',
      greetingText: 'day',
      mainFocus: null
    }
  }

 componentWillMount() {
   this.setState({
     greetingText: this.getGreeting(),
   })
 }

  getGreeting() {
    var date = new Date();
    var hour = date.getHours();
    if (hour > 11 && hour < 19) {
      return 'afternoon';
    } else if (hour > 18) {
      return 'evening';
    } else {
      return 'morning';
    }
  }

  render() {
    return (
      <ImageBackground
          style={styles.image}
          // source={{url: 'https://source.unsplash.com/1600x900/daily?landscape'}}
          // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
          source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
          imageStyle={{resizeMode: 'cover'}}
      >
        <View style={styles.container}>
          <Text style = {styles.header}>
            Good {this.state.greetingText}, {"\n"}
            {this.state.name}. 
          </Text>
          <Text style={styles.mainFocusHeader}> What is your main focus for today? </Text>
          <TextInput
            placeholder = ''
            style = {styles.mainFocusInput}
          />
          <Text style={styles.TodoHeader}>Todo:</Text>
          <TextInput
            style={styles.TodoInput}
            placeholder = 'New Todo'
          />
          <FlatList />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flexGrow:1,
    height: null,
    width:null,
    alignItems: 'center',
    // justifyContent:'center',
  },
  header: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    fontSize: 45
  },
  container: {
    flex: 1,
    top: '12%'
  },
  mainFocusHeader: {
    padding: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    textShadowColor: '#000000'
  },
  mainFocusInput: {
    borderColor: '#ffffff',
    borderBottomWidth: 2,
    color: '#ffffff',
    fontSize: 30,
    textShadowColor: '#000000'
  },
  TodoHeader: {
    padding: 10,
    color: '#ffffff',
    fontSize: 30,
    textShadowColor: '#000000',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  TodoInput: {
    fontSize: 20,
    color: '#ffffff'
  }
});



