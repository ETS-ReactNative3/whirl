import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator,
  DrawerItems,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';

import { Auth } from 'aws-amplify';
import { logOut } from '../actions';

import Home from '../screens/Homescreen';
import LogOut from '../auth/LogOut';
import db from '../screens/db';
import Settings from '../screens/Settings';
import ModalScreen from '../components/ModalScreen';

const CustomDrawerContentComponent = props => (
  <View style={styles.view}>
    <Image
      source={require('../assets/icons/tornado.png')}
      style={styles.drawerImage}
    />
    <DrawerItems {...props} />
  </View>
);

// screens in the app. They will appear in the menu in the same order

const DrawerNav = createDrawerNavigator(
  {
    Home: { screen: Home },
    Settings: Settings,
    LogOut: LogOut,
    Database: db
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerContentComponent
  }
);

const RootStack = createStackNavigator(
  {
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
    initialRouteName: 'Main'
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
  }
});

export default Nav;
