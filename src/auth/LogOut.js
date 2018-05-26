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
import StatusBar from '../components/StatusBar';

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
        <StatusBar />
        {/* Header bar. Contains the button for the drawer menu */}
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

        {/* Logout button */}
        <View style={{ alignItems: 'center', flex: 1 }}>
          <TouchableOpacity
            onPress={this.logout.bind(this)}
            // style={{ flex: 1 }}
          >
            <Text style={styles.button}>Logout</Text>
          </TouchableOpacity>
        </View>
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
    width: null
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
  },
  headerBar: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20
  },
  headerMenu: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    marginLeft: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
