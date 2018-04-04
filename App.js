import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'C2P1'
    }
  }


  render() {
    return (
      <ImageBackground
          style={styles.image}
          source={{url: 'https://source.unsplash.com/1600x900/daily?landscape'}}
          imageStyle={{resizeMode: 'cover'}}
      >
        <View style={styles.container}>
          <Text 
            style = {styles.paragraph}
            adjustsFontSizeToFit={true}
          >
            Good evening, {"\n"}
            {this.state.name}.
          </Text>
        </View>
      </ImageBackground>
        
    );
  }
}


const styles = StyleSheet.create({
  container: {
    top: '20%'
  },
  image: {
    flexGrow:1,
    height:null,
    width:null,
    alignItems: 'center',
    // justifyContent:'center',
  },
  paragraph: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    fontSize: 40
  },
});



