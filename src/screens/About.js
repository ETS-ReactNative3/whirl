import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { fonts } from '../theme';

class About extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../assets/icons/about.png')}
        style={{ height: 24, width: 24 }}
      />
    )
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'skyblue' }}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.headerMenu}
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
          >
            <Image
              source={require('../assets/icons/menuPink.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 150,
            marginTop: 50
          }}
        >
          <Text style={styles.text}>By C2P1</Text>

          <Text style={styles.text}>
            Built during my third year exams at university, using React Native
            and Amazon Web Services.
          </Text>

          <Text style={styles.text}>Copyright 2018</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20
  },
  headerMenu: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    marginLeft: 5
  },
  text: {
    textAlign: 'center',
    fontFamily: fonts.base
  }
});

export default About;
