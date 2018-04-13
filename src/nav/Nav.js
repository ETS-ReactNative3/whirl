import React from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'

import Home from '../components/Homescreen/Homescreen'
import LougOut from '../auth/LogOut'

const routeConfig = {
  Home: { screen: Home },
  LogOut: { screen: LougOut },
}

// const StackNav = StackNavigator(routeConfig)
// const TabNav = TabNavigator(routeConfig)
const DrawerNav = DrawerNavigator(routeConfig)


class Nav extends React.Component {
  render() {
    return (
      <DrawerNav />
    )
  }
}

export default DrawerNav
