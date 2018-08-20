import React from 'react';
import { View, Platform } from 'react-native';

const StatusBar = ({ backgroundColor = '#00000000' }) => {
  return (
    <View
      style={{
        paddingTop: marginTop,
        backgroundColor: backgroundColor
      }}
    />
  );
};

const marginTop = Platform.OS === 'ios' ? 20 : 0;

export default StatusBar;
