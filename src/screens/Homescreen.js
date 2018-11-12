import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

// components
import MainFocus from '../components/MainFocus/MainFocus';
import Todo from '../components/Todo/Todo';
import StatusBar from '../components/StatusBar';
import Offline from '../components/Offline';

import { DrawerActions } from 'react-navigation';

import { Auth } from 'aws-amplify';
import { fonts } from '../theme';
import Constants from '../constants';

class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greetingText: this.getGreeting(),
      uniqueKey: 1,
      loading: true,
      backgroundSource: '',
      textColor: ''
    };
    this.scrollView = React.createRef();
  }

  /**
   * callback function for getting user attributes.
   *
   * This function specifically gets and stores both the given_name and
   * email (id) of the user.
   */
  getPersonalDetails = (err, content) => {
    var name = content[2]['Value'];
    var email = content[3]['Value'];

    this.setState({
      name: name
    });

    this.storeName(name);
    this.storeEmail(email);
  };

  /**
   * Store the given_name of the user to async storage
   * @param {String} name
   */
  async storeName(name) {
    try {
      await AsyncStorage.setItem('name', name);
    } catch (error) {
      console.log('Home: error setting the name item in storage: ');
      console.log(error);
    }
  }

  /**
   * Store the email of the user to async storage
   * @param {String} email
   */
  async storeEmail(email) {
    try {
      await AsyncStorage.setItem('email', email);
      this.setState({
        uniqueKey: this.state.uniqueKey + 1
      });
    } catch (error) {
      console.log('Home: error setting the email item in storage: ', error);
      console.log(error);
    }
  }

  /**
   * Store the default values of backgroundSource and textColor to async storage
   */
  storeDefaults() {
    AsyncStorage.multiSet([
      ['backgroundSource', 'DEFAULT'],
      ['textColor', '#ffffff']
    ]);
  }

  /**
   * Get the current authenticated user and set state values that rely on function output.
   *
   * Loads the required items from async storage; backgroundSource, given_name,
   * and textColor.
   */
  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();

    await AsyncStorage.multiGet(
      ['name', 'backgroundSource', 'textColor'],
      (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];
          console.log(key, value);
          this.setState({
            [key]: value
          });
        });
        if (this.state.name === undefined || this.state.name === null) {
          user.getUserAttributes(this.getPersonalDetails);
          this.setState({
            backgroundSource: 'DEFAULT',
            textColor: '#ffffff'
          });
          this.storeDefaults();
        }
        this.setState({
          uniqueKey: this.state.uniqueKey + 1
        });
      }
    ).then(() => {
      this.setState({
        backgroundSource: this.state.backgroundSource,
        loading: false
      });
    });

    SplashScreen.hide();
  }

  /**
   * work out which greeting to give the user out of:
   * morning, afternoon, evening, depending on the time of day.
   */
  getGreeting() {
    var date = new Date();
    var hour = date.getHours();
    const text = 'Good ';
    if (hour > 17) {
      return text + 'evening,';
    } else if (hour > 11) {
      return text + 'afternoon,';
    } else {
      return text + 'morning,';
    }
  }

  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../assets/icons/home.png')}
        style={{ height: 24, width: 24 }}
      />
    )
  };

  render() {
    // use const to store the current text color.
    // neccessary for overriding textColor in any style presets.
    const textColorConst = {
      color: this.state.textColor
    };

    const backgroundLocation = String(
      Constants.BACKGROUND_LOCATIONS + this.state.backgroundSource + '.jpg'
    );

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={{ uri: backgroundLocation }}
          imageStyle={{ resizeMode: 'cover' }}
        >
          {/* Include status bar to leave width for status bar */}
          <StatusBar />
          <Offline message="The internet connection appears to be offline. Cannot get todo items." />
          <View style={{ flex: 1 }}>
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
            <ScrollView
              ref={this.scrollView}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 50,
                marginBottom: 50
              }}
              key={this.state.uniqueKey}
            >
              {this.state.loading ? (
                <View>
                  <ActivityIndicator style={{ flex: 1, paddingTop: 100 }} />
                </View>
              ) : (
                <View>
                  <Text style={[styles.header, textColorConst]}>
                    {this.state.greetingText} {'\n'}
                    {this.state.name}
                  </Text>
                  <View style={styles.mainFocus}>
                    <MainFocus key={this.state.uniqueKey} />
                  </View>
                  <View style={styles.todos}>
                    <Todo
                      navigation={this.props.navigation}
                      scroll={this.scrollView}
                      key={this.state.uniqueKey}
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: null,
    width: null
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowRadius: 1,
    fontSize: 45,
    textShadowOffset: { width: 0.5, height: 0.5 },
    fontFamily: fonts.bold,
    color: '#ffffff'
  },
  mainFocusHeader: {
    padding: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Helvetica Neue'
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
  },
  mainFocus: {
    alignItems: 'center'
  },
  todos: {
    marginLeft: 10,
    marginRight: 10
  }
});

export default Homescreen;
