import React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'

import { colors, fonts } from '../theme'

export default ({ placeholder, onChangeText, type, placeholderTextColor="#ffffff", ...props }) => (
  <TextInput
    autoCapitalize='none'
    autoCorrect={false}
    style={[styles.input]}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    onChangeText={value => onChangeText(type, value)}
    underlineColorAndroid='transparent'
    {...props}
  />
)

const styles = StyleSheet.create({
  input: {
    // height: 45,
    color: '#ffffff',
    padding: 10,
    // marginBottom: 15,
    borderBottomWidth: 1.5,
    fontSize: 16,
    borderBottomColor: colors.primary,
    fontFamily: fonts.light,
    fontWeight: 'bold',
    // backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
})
