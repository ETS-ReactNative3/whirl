import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';

import { Auth } from 'aws-amplify';
import { logOut } from '../actions';

import Home from '../screens/Homescreen';
import LogOut from '../auth/LogOut';
import db from '../screens/db';
import Settings from '../screens/Settings';

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
// const routeConfig =

const DrawerNav = DrawerNavigator(
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

class Nav extends React.Component {
  render() {
    return <DrawerNav />;
  }
}

const styles = StyleSheet.create({
  drawerImage: {
    justifyContent: 'center',
    alignItems: 'center'
  }
  // view: {
  //   // flexDirection: 'row',
  //   marginBottom: 10,
  //   alignItems: 'center'
  // }
});

export default DrawerNav;
