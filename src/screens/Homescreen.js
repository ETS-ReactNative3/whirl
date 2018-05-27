import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator
} from 'react-native';

// components
import MainFocus from '../components/MainFocus/MainFocus';
import Todo from '../components/Todo/Todo';
import StatusBar from '../components/StatusBar';

import { DrawerActions, createStackNavigator } from 'react-navigation';

import Amplify, { Auth, API } from 'aws-amplify';
import { fonts } from '../theme';

class Homescreen extends Component {
  state = {
    name: '',
    greetingText: '',
    todos: [],
    user: {},
    backgroundSource:
      'https://source.unsplash.com/collection/1457745/900x1600/daily',
    textColor: '#ffffff',
    email: '',
    apiResponse: '',
    isLoading: true
  };

  /**
   * callback function for getting user attributes.
   *
   * This function specifically gets and stores both the given_name and
   * email (id) of the user.
   */
  getName = (err, content) => {
    console.log(err);
    var name = content[2]['Value'];
    var email = content[3]['Value'];
    console.log(content);
    console.log('name: ' + name);

    this.setState({
      name: name,
      email: email.replace('@', '.at.')
    });
    this.storeName(this.state.name);
    this.storeEmail(this.state.email);
    console.log('email: ' + this.state.email);
  };

  /**
   * Store the given_name of the user to async storage
   * @param {String} name
   */
  async storeName(name) {
    try {
      await AsyncStorage.setItem('name', name);
    } catch (error) {
      console.log('error setting the name item in storage: ');
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
    } catch (error) {
      console.log('error setting the email item in storage: ');
      console.log(error);
    }
  }

  /**
   * Get the current authenticated user and set state values that rely on function output.
   *
   * Loads the required items from async storage; backgroundSource, given_name,
   * and textColor.
   */
  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({
      greetingText: this.getGreeting(),
      // user,
      name: this.props.name
    });

    // user.getUserAttributes(this.getName);
    // load the string given_name from local storage
    try {
      const value = AsyncStorage.getItem('name').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            name: keyvalue
          });
          console.log('Home: successfully loaded name');
        } else {
          console.log('Home: no name item in storage');
          user.getUserAttributes(this.getName);
        }
      });
    } catch (error) {
      console.log('Home: theres been an error getting the name item: ' + error);
    }

    try {
      const value = AsyncStorage.getItem('email').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            email: keyvalue
          });
          console.log('Home: successfully loaded email');
        } else {
          console.log('Home: no email item in storage');
          user.getUserAttributes(this.getName);
        }
      });
    } catch (error) {
      console.log(
        'Home: theres been an error getting the email item: ' + error
      );
    }

    // load the url backgroundSource from local storage
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null) {
            this.setState({
              backgroundSource: keyvalue
            });
            console.log('Home: background source: ' + keyvalue);
          } else {
            console.log('Home: no backgroundSource item in storage');
          }
        }
      );
    } catch (error) {
      console.log(
        'Home: theres been an error getting the backgroundSource item: ' + error
      );
    }

    // load the hex code string textColor from local storage
    try {
      const value = await AsyncStorage.getItem('textColor').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            textColor: keyvalue
          });
          console.log('Home: successfully loaded textColor');
        } else {
          this.setState({
            textColor: '#ffffff'
          });
          console.log('Home: no textColor item in storage');
        }
      });
    } catch (error) {
      console.log(
        'Home: theres been an error getting the textColor item: ' + error
      );
    }
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

  forceRemount() {
    console.log('forcing remount');
    this.setState(this.state);
  }

  todoAddedHandler() {
    this.getListItems();
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

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={{ url: this.state.backgroundSource }}
          imageStyle={{ resizeMode: 'cover' }}
        >
          {/* Add a default ImageBackground here whilst the one above loads? */}
          {/* {defaultBackground} */}

          <StatusBar />
          {/* TouchableWithoutFeedback expects to have only one child element. Therefore 
          wrap everything in a single view */}
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

            {/* Page content wrapped in a scroll view */}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
            >
              {/* Greeting */}
              <Text style={[styles.header, textColorConst]}>
                {this.state.greetingText} {'\n'}
                {this.state.name}
              </Text>

              {/* Main Focus */}
              <View style={styles.mainFocus}>
                <MainFocus color={this.state.textColor} />
              </View>

              {/* Todo list */}
              <View style={styles.todos}>
                <Todo navigation={this.props.navigation} />
              </View>
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
    fontFamily: fonts.bold
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
