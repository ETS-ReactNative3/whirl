import React from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'

import { Auth } from 'aws-amplify'
import { logOut } from '../actions'

import Home from '../screens/Homescreen'
import LogOut from '../auth/LogOut'
import db from '../screens/db';
import Settings from '../screens/Settings'

const routeConfig = {
  Home: { screen: Home },
  Settings: Settings,
  LogOut: LogOut,
  Database: db,
}

const DrawerNav = DrawerNavigator(routeConfig)

class Nav extends React.Component {
  render() {
    return (
      <DrawerNav />
    )
  }
}

export default DrawerNav
