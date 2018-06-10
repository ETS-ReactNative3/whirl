import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  AsyncStorage
} from 'react-native';

import Input from '../Input';
import Button from '../Button';
import { colors, fonts } from '../../theme';
import StatusBar from '../StatusBar';
import Constants from '../../constants';

class MainFocusInput extends Component {
  state = {
    focus: '',
    modalVisible: false,
    textColor: '#ffffff',
    backgroundSource: Constants.BACKGROUNDS.DEFAULT,
    mounted: false
  };

  /**
   * load values in separate method as sometimes react-native tried to load
   * the values before the component was properly mounted.
   * preventing the (error) warning: Can't call setState (or forceUpdate) on an unmounted component.
   */
  async componentDidMount() {
    this.mounted = true;
    this.setValues();
  }

  /**
   * set mounted to false. Used in conjunction with setValues() to prevent calling
   * setState on an unmounted component.
   */
  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Load textColor and backgroundSource values from local storage.
   * Only will work if mounted is set to true.
   */
  async setValues() {
    // load textColor hex code from local storage
    try {
      const value = await AsyncStorage.getItem('textColor').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            textColor: keyvalue
          });
          console.log('MainFocusInput: successfully loaded textColor');
        } else {
          if (this.mounted) {
            this.setState({
              textColor: '#ffffff'
            });
          } else {
            console.log('mainfocusinput unmounted');
          }
          console.log('MainFocusInput: no textColor item in storage');
        }
      });
    } catch (error) {
      console.log(
        'MainFocusInput: theres been an error getting the textColor item'
      );
    }

    // load backgroundSource url from local storage
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null) {
            if (this.mounted) {
              this.setState({
                backgroundSource: keyvalue
              });
            } else {
              console.log('mainfocusinput unmounted');
            }
            console.log(keyvalue);
          } else {
            console.log('MainFocusInput: no backgroundSource item in storage');
          }
        }
      );
    } catch (error) {
      console.log(
        'MainFocusInput: theres been an error getting the backgroundSource item'
      );
    }
  }

  /**
   * update the state of this class to the latest focus
   */
  onChangeText = (key, value) => {
    console.log(key + ' ' + value);
    this.setState({
      [key]: value
    });
  };

  /**
   * if the focus input is not an empty string, call the props method
   * to submit the new focus.
   */
  focusAddedHandler = () => {
    if (this.state.focus.trim() === '') return;

    this.props.onFocusAdded(this.state.focus.trim());
  };

  /**
   * set whether the modal is visible
   * @param {boolean} visible
   */
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    // get the textColor. Used to override textColor in any styles.
    const textColorConst = {
      color: this.state.textColor
    };

    // the underline on the homescreen should be set to the same as the textColor
    const borderColor = {
      borderColor: this.state.textColor
    };

    return (
      <View>
        {/* Open a modal for the text input */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ImageBackground
            style={styles.image}
            source={{ url: this.state.backgroundSource }}
            imageStyle={{ resizeMode: 'cover' }}
          >
            {/* TouchAbleWithouFeedback component to close keyboard by pressing anywhere */}
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
              style={{ flex: 1 }}
            >
              <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
                {/* Header bar at the top of the page */}
                <View style={styles.header}>
                  {/* close button in top left */}

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={styles.close}
                  >
                    <Image
                      source={require('../../assets/icons/cross.png')}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableHighlight>

                  {/* Page title */}
                  <Text style={styles.headerText}>Add a main focus</Text>

                  {/* add button in top right */}
                  <TouchableHighlight
                    onPress={() => {
                      // add the new focus
                      this.focusAddedHandler();

                      // hide modal at the same time
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={styles.add}
                  >
                    <Image
                      source={require('../../assets/icons/tick.png')}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableHighlight>
                </View>

                {/* Main body of the page */}
                <View style={styles.container}>
                  {/*  Focus input */}
                  <View style={styles.inputLineContainer}>
                    <Input
                      style={styles.input}
                      type="focus"
                      placeholder="Focus"
                      autoCorrect={true}
                      autoCapitalize="sentences"
                      multiline={true}
                      autoFocus={true}
                      placeholderTextColor="#ffffff"
                      onChangeText={this.onChangeText}
                    />
                  </View>

                  {/* Add focus button. Saves the new focus value. */}
                  <View style={styles.button}>
                    <Button
                      title="Add Focus"
                      onPress={() => {
                        // add the new focus
                        this.focusAddedHandler();

                        // hide modal at the same time
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ImageBackground>
        </Modal>

        {/* This button is the 'input' line seen on the homescreen. 
        Pressing it opens the modal. */}
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={[styles.focusInput, borderColor]}
        >
          <View>
            <Text style={[styles.mainFocusHeader, textColorConst]}>
              {' '}
              What is your main focus for today?{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 40
  },
  focusInput: {
    borderBottomWidth: 2,
    paddingTop: 25,
    marginBottom: 10
  },
  mainFocusHeader: {
    padding: 15,
    textAlign: 'center',
    fontSize: 30,
    textShadowColor: '#000000',
    fontFamily: fonts.light
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center'
  },
  headerText: {
    margin: 5,
    color: '#ffffff',
    fontSize: 30,
    fontFamily: fonts.light
  },
  body: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 0.2,
    borderColor: colors.primary
  },
  inputLineContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  button: {},
  input: {
    color: '#ffffff',
    padding: 10,
    borderBottomWidth: 1.5,
    fontSize: 16,
    borderBottomColor: colors.primary,
    fontFamily: fonts.light,
    fontWeight: 'bold',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
});

export default MainFocusInput;
