import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { fonts } from '../theme';

export default ({
  placeholder,
  onChangeText,
  type,
  placeholderTextColor = '#ffffff',
  multiline = false,
  ref,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboadType = 'default',
  ...props
}) => (
  <TextInput
    autoCapitalize={autoCapitalize}
    autoCorrect={autoCorrect}
    style={[styles.input]}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    onChangeText={value => onChangeText(type, value)}
    underlineColorAndroid="transparent"
    multiline={multiline}
    ref={ref}
    keyboardType={keyboadType}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    color: '#ffffff',
    padding: 10,
    fontSize: 16,
    fontFamily: fonts.light,
    fontWeight: 'bold'
  }
});
