import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';

import { colors, fonts } from '../theme';
import Amplify, { Auth, API } from 'aws-amplify';
import StatusBar from './StatusBar';
import Constants from '../constants';
import Button from './Button';
import Input from './Input';

class ModalScreen extends Component {
  state = {
    backgroundSource: '',
    item: ''
  };

  async componentDidMount() {
    // load background
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null) {
            this.setState({
              backgroundSource: keyvalue
            });
          } else {
            console.log('ModalScreen: no backgroundSource item in storage');
          }
        }
      );
    } catch (error) {
      console.log(
        'ModalScreen: theres been an error getting the backgroundSource item'
      );
      console.log(error);
    }
  }

  /**
   * update the item value in state as text is being inputted
   */
  onChangeText = (key, value) => {
    console.log(key, value);
    this.setState({
      item: value
    });
  };

  itemAdded() {
    if (this.state.item.trim() === '') {
      Alert.alert(this.props.InputType + ' item cannot be empty');
      return;
    }
    this.props.addedHandler(this.state.item);
    this.props.setModalVisible(false);
  }

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
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              {/* close button in top left */}
              <TouchableHighlight
                onPress={() => this.props.setModalVisible(false)}
                style={styles.close}
              >
                <Image
                  source={require('../assets/icons/cross.png')}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableHighlight>

              {/* Page title */}
              <Text style={styles.headerText}>{this.props.Header}</Text>

              {/* add button in top right */}
              <TouchableHighlight
                onPress={() => {
                  // add the new focus
                  this.itemAdded();
                }}
                style={styles.add}
              >
                <Image
                  source={require('../assets/icons/tick.png')}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.container}>
              <View style={styles.inputLineContainer}>
                <Input
                  style={styles.input}
                  type={this.props.InputType}
                  placeholder={this.props.InputPlaceholder}
                  autoCorrect={true}
                  autoCapitalize={this.props.autoCapitalize}
                  multiline={true}
                  autoFocus={true}
                  placeholderTextColor="#ffffff"
                  onChangeText={this.onChangeText}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title={this.props.ButtonTitle}
                  onPress={() => {
                    // add the new item
                    this.itemAdded();
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 50
  },
  todoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  todoInput: {
    marginTop: 7,
    marginLeft: 10,

    fontSize: 20,
    color: '#808080',
    textAlignVertical: 'top'
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

  container: {
    flex: 1,

    paddingTop: 60,
    paddingHorizontal: 40
  },
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

export default ModalScreen;
