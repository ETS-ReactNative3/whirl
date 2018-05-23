import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

import { DrawerActions } from 'react-navigation';

import { logOut } from '../actions';
import { fonts, colors } from '../theme';

class LogOut extends Component {
  /**
   * Log the current user out from their current session
   */
  logout() {
    Auth.signOut()
      .then(() => {
        this.props.dispatchLogout();
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../assets/icons/logout.png')}
        style={{ height: 24, width: 24 }}
      />
    )
  };

  render() {
    return (
      <ImageBackground
        style={styles.image}
        source={require('../assets/DefaultBackground2.jpeg')}
        imageStyle={{ resizeMode: 'cover' }}
      >
        {/* Header bar contains just the menu button */}
        <TouchableOpacity
          style={styles.headerBar}
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
        >
          <Image
            source={require('../assets/icons/menu.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity onPress={this.logout.bind(this)} style={{ flex: 1 }}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
};

const styles = StyleSheet.create({
  image: {
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center'
  },
  headerBar: {
    position: 'absolute',
    top: 5,
    left: 5,
    flexDirection: 'row',
    flex: 1,
    padding: 10
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fonts.light,
    top: '40%',
    backgroundColor: '#ffffff',
    fontSize: 40,
    borderRadius: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
