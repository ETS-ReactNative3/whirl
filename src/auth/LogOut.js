import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

import { DrawerActions } from 'react-navigation';

import { logOut } from '../actions';
import { fonts } from '../theme';
import StatusBar from '../components/StatusBar';
import Constants from '../constants';

class LogOut extends Component {
  state = {
    backgroundSource: ''
  };

  async componentDidMount() {
    // load backgroundSource from local storage
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null) {
            this.setState({
              backgroundSource: keyvalue
            });
          } else {
            console.log('LogOut: no backgroundSource item in storage');
            this.setState({
              backgroundSource: 'DEFAULT'
            });
          }
        }
      );
    } catch (error) {
      console.log(
        'LogOut: theres been an error getting the backgroundSource item'
      );
      this.setState({
        backgroundSource: 'DEFAULT'
      });
    }
  }

  /**
   * Log the user out from their current session
   */
  logout() {
    try {
      AsyncStorage.multiRemove(['name', 'email', 'focus', 'backgroundSource']);
    } catch (e) {
      Alert.alert('There was an error logging out. Please try again.');
      return;
    }

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
        source={{
          uri:
            '' +
            Constants.BACKGROUND_LOCATIONS +
            this.state.backgroundSource +
            '.jpg'
        }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <StatusBar backgroundColor="#ffffff" />
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
          <View style={styles.view}>
            <Text style={styles.text}>Are you sure you want to log out?</Text>
          </View>
          <TouchableOpacity
            onPress={this.logout.bind(this)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log Out</Text>
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
  view: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginBottom: 20,
    marginTop: 20
  },
  headerBar: {
    position: 'absolute',
    top: 5,
    left: 5,
    flexDirection: 'row',
    flex: 1,
    padding: 10
  },
  text: {
    padding: 5,

    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: fonts.light,
    fontSize: 20,
    borderRadius: 20
  },
  button: {
    paddingLeft: 80,
    paddingRight: 80,
    marginTop: 20,
    borderRadius: 40,
    borderColor: 'rgba(231,25,25,0.5)',
    borderWidth: 1.5,
    backgroundColor: '#E71919'
  },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: fonts.light,
    fontSize: 30,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut);
