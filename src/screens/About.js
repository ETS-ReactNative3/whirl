import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import { fonts } from '../theme';
import StatusBar from '../components/StatusBar';

class About extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../assets/icons/about.png')}
        style={{ height: 24, width: 24 }}
      />
    )
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={require('../assets/DefaultBackground3.jpg')}
          imageStyle={{ resizeMode: 'cover' }}
        >
          {/* <View style={{ flex: 1, backgroundColor: 'skyblue' }}> */}
          <StatusBar />
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.headerMenu}
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
            >
              <Image
                source={require('../assets/icons/menuPink.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 40,
              marginBottom: 10
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={styles.title}> Whirl </Text>
              <Image source={require('../assets/icons/tornado.png')} />
            </View>

            <ScrollView style={{ flex: 1 }}>
              <View style={{ padding: 20 }}>
                <Text style={styles.body}>
                  Built during my third year exams at university, using React
                  Native and Amazon Web Services.
                </Text>
              </View>
            </ScrollView>

            <Text style={styles.footer}>Copyright 2018</Text>
          </View>
          {/* </View> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20
  },
  headerMenu: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    marginLeft: 5
  },
  footer: {
    textAlign: 'center',
    fontFamily: fonts.base,
    color: '#ffffff'
  },
  body: {
    textAlign: 'center',
    fontFamily: fonts.base,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  title: {
    paddingTop: 10,
    fontFamily: 'Billabong',
    fontSize: 50
  },
  image: {
    flex: 1,
    height: null,
    width: null
  }
});

export default About;
