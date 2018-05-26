import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const MyStatusBar = ({ backgroundColor = '#00000000' }) => {
  // const
  return (
    <View
      style={
        // [styles.statusBar, backgroundColor]
        {
          paddingTop: marginTop,
          backgroundColor: backgroundColor
        }
      }
    />
  );
};

const marginTop = Platform.OS === 'ios' ? 20 : 0;
// const styles = StyleSheet.create({
//   statusBar: {
//     paddingTop: marginTop,
//     backgroundColor: '#00000000'
//   }
// });

export default MyStatusBar;
