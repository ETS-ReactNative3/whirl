import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  AsyncStorage
} from 'react-native';

import { fonts } from '../../theme';

import ModalScreen from '../ModalScreen';

class MainFocusInput extends Component {
  state = {
    focus: '',
    modalVisible: false,
    textColor: '',
    backgroundSource: '',
    mounted: false
  };

  /**
   * load values in separate method as sometimes react-native tried to load
   * the values before the component was properly mounted.
   * preventing the (error) warning: Can't call setState (or forceUpdate) on an unmounted component.
   */
  async componentDidMount() {
    this.state.mounted = true;
    this.setValues();
  }

  /**
   * set mounted to false. Used in conjunction with setValues() to prevent calling
   * setState on an unmounted component.
   */
  componentWillUnmount() {
    this.state.mounted = false;
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
          if (this.state.mounted) {
            this.setState({
              textColor: keyvalue
            });
          }
          console.log('MainFocusInput: successfully loaded textColor');
        } else {
          console.log('MainFocusInput: no textColor item in storage');
        }
      });
    } catch (error) {
      console.log(
        'MainFocusInput: theres been an error getting the textColor item'
      );
    }

    // load backgroundSource from local storage
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null) {
            if (this.state.mounted) {
              this.setState({
                backgroundSource: keyvalue
              });
            }
          } else {
            console.log('MainFocusInput: no backgroundSource item in storage');
            this.setState({
              backgroundSource: 'DEFAULT'
            });
          }
        }
      );
    } catch (error) {
      console.log(
        'MainFocusInput: theres been an error getting the backgroundSource item'
      );
      this.setState({
        backgroundSource: 'DEFAULT'
      });
    }
  }

  /**
   * update the state of this class to the latest focus
   */
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  /**
   * if the focus input is not an empty string, call the props method
   * to submit the new focus.
   */
  focusAddedHandler = focus => {
    if (focus.trim() === '') return;

    this.props.onFocusAdded(focus.trim());
  };

  /**
   * set whether the modal is visible
   * @param {boolean} visible
   */
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    /*
     * set the color of the main focus using the users preference.
     * If no preference set (in settings), color defaults to #ffffff
     */
    var textColorConst;
    var borderColor;

    if (this.state.textColor === '') {
      textColorConst = {
        color: '#ffffff'
      };
      borderColor = {
        borderColor: '#ffffff'
      };
    } else {
      textColorConst = {
        color: this.state.textColor
      };
      borderColor = {
        borderColor: this.state.textColor
      };
    }

    return (
      <View>
        {/* Input modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ModalScreen
            Header={'Add a main focus'}
            InputType={'focus'}
            InputPlaceholder={'Focus'}
            autoCapitalize={'sentences'}
            ButtonTitle={'Add Focus'}
            addedHandler={this.focusAddedHandler.bind(this)}
            setModalVisible={this.setModalVisible.bind(this)}
          />
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
  }
});

export default MainFocusInput;
