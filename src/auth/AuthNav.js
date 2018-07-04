import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import { colors, fonts } from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

// const routes = {
//   // load sign in screen
//   SignIn: {
//     screen: SignIn,
//     navigationOptions: {
//       title: 'Sign In',
//       tabBarIcon: ({ tintColor }) => (
//         <Image
//           source={require('../assets/icons/signIn.png')}
//           style={[styles.icon, { tintColor }]}
//         />
//       )
//     }
//   },

//   // Load sign up screen
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       title: 'Sign Up',
//       tabBarIcon: ({ tintColor }) => (
//         <Image
//           source={require('../assets/icons/signUp.png')}
//           style={[styles.icon, { tintColor }]}
//         />
//       )
//     }
//   }
// };

// Tab bar route
// const routeConfig = {
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     showLabel: true,
//     activeTintColor: '#0A2472',
//     inactiveTintColor: colors.secondary,
//     indicatorStyle: { backgroundColor: colors.secondary },
//     labelStyle: {
//       fontFamily: fonts.base,
//       fontSize: 12
//     },
//     style: {
//       backgroundColor: 'white',
//       borderTopWidth: 0,
//       paddingBottom: 3
//     }
//   }
// };

// const styles = StyleSheet.create({
//   icon: {
//     width: 26,
//     height: 26
//   }
// });

// export default TabNavigator(routes, routeConfig);

export default createStackNavigator(
  {
    SignIn: {
      screen: SignIn
    },
    SignUp: {
      screen: SignUp
    },
    ForgotPassword: {
      screen: ForgotPassword
    }
  },
  {
    headerMode: 'none'
  }
);
