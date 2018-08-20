import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import { colors, fonts } from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

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
