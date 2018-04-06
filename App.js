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
import Homescreen from './src/components/Homescreen/Homescreen';
import RequireName from './src/components/Homescreen/RequireName';

export default class App extends Component {
  state = {
    name: '',
  }

  nameAddedHandler = (val) => {
    this.setState({
      name: val
    })
  }

  render() {
    const seenBefore = (this.state.name === '') ? (
      <RequireName onNameAdded={this.nameAddedHandler}/>
    ) : (
      <Homescreen name={this.state.name}/>
    )
    return (
      <ImageBackground
          style={styles.image}
          // source={{url: 'https://source.unsplash.com/900x600/daily?landscape'}}
          // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
          // source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
          source = {require('./resources/img/DefaultBackground.jpg')}
          imageStyle={{resizeMode: 'cover'}}
      >
        <View>
          {seenBefore}
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
  },
});



