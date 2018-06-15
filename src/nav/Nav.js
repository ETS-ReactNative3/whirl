import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import {
  DrawerItems,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';

import Start from '../components/Start';
import Home from '../screens/Homescreen';
import About from '../screens/About';
import LogOut from '../auth/LogOut';
import Settings from '../screens/Settings';
import ModalScreen from '../components/ModalScreen';
import StatusBar from '../components/StatusBar';

const CustomDrawerContentComponent = props => (
  <View style={styles.view}>
    <StatusBar />
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <Text style={styles.text}> Whirl </Text>
      <Image
        source={require('../assets/icons/tornado.png')}
        style={styles.drawerImage}
      />
    </View>
    <DrawerItems {...props} />
  </View>
);

// screens in the app. They will appear in the menu in the same order
const DrawerNav = createDrawerNavigator(
  {
    Home: { screen: Home },
    Settings: Settings,
    LogOut: LogOut,
    About: About
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerContentComponent
  }
);

const RootStack = createStackNavigator(
  {
    Start: {
      screen: Start
    },
    Main: {
      screen: DrawerNav
    },
    MyModal: {
      screen: ModalScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Start'
  }
);

class Nav extends Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  drawerImage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    paddingTop: 10,
    fontFamily: 'Billabong',
    fontSize: 36
  }
});

export default Nav;
