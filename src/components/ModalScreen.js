import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Modal,
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
    todo: '',
    allTodo: [],
    modalVisible: false,
    backgroundSource: Constants.BACKGROUNDS.DEFAULT
  };

  async componentDidMount() {
    // load email address
    try {
      const value = AsyncStorage.getItem('email').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            User: keyvalue
          });
          console.log('Todo: successfully loaded email');
        } else {
          console.log('Todo: no email item in storage');
          this.setState({
            isLoading: false
          });
        }
      });
    } catch (error) {
      console.log(
        'Todo: theres been an error getting the email item: ' + error
      );
    }

    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null) {
            this.setState({
              backgroundSource: keyvalue
            });
            console.log(keyvalue);
          } else {
            console.log('ModalScreen: no backgroundSource item in storage');
          }
        }
      );
    } catch (error) {
      console.log(
        'TodoInput: theres been an error getting the backgroundSource item'
      );
      console.log(error);
    }
  }

  /**
   * update the todo value in state as text is being inputted
   */
  onChangeText = (key, value) => {
    console.log(key + ' ' + value);
    this.setState({
      [key]: value
    });
  };

  /**
   * Add todo item to database
   */
  todoAddedHandler = () => {
    if (this.state.todo.trim() === '') {
      Alert.alert('Todo item cannot be empty');
      return;
    }

    this.saveNote();
    this.props.navigation.goBack();
    this.props.navigation.state.params.updateData();
  };

  // Create a new Note according to the columns we defined earlier
  saveNote() {
    var date = new Date();
    let newNote = {
      body: {
        Content: this.state.todo.trim(),
        Completed: 'false',
        User: this.state.User,
        Date: date.getTime().toString()
      }
    };
    const path = '/TodoItems';

    console.log(newNote.body.User);
    console.log(newNote.body.Content);
    console.log(newNote.body.Completed);
    console.log(newNote.body.Date);

    // Use the API module to save the note to the database
    try {
      const apiResponse = API.put('TodoItemsCRUD', path, newNote).then(
        value => {
          if (value !== null) {
            console.log('api response: ', value);
          }
        }
      );
      this.setState({ apiResponse });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={{ url: this.state.backgroundSource }}
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
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.close}
                >
                  <Image
                    source={require('../assets/icons/cross.png')}
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableHighlight>

                {/* Page title */}
                <Text style={styles.headerText}>Add a Todo</Text>

                {/* add button in top right */}
                <TouchableHighlight
                  onPress={() => {
                    // add the new focus
                    this.todoAddedHandler();
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
                    type="todo"
                    placeholder="New Todo"
                    autoCorrect={true}
                    autoCapitalize="sentences"
                    multiline={true}
                    autoFocus={true}
                    placeholderTextColor="#ffffff"
                    onChangeText={this.onChangeText}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Add Todo"
                    onPress={() => {
                      // add the new focus
                      this.todoAddedHandler();
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>
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
    // marginBottom: 5,
    fontSize: 20,
    color: '#808080',
    textAlignVertical: 'top'
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null
    // alignItems: 'center',
    // justifyContent:'center',
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
    // fontWeight: 'bold',
    fontSize: 30,
    fontFamily: fonts.light
  },
  close: {},
  add: {},
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
  container: {
    flex: 1,
    // justifyContent: 'center',
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
