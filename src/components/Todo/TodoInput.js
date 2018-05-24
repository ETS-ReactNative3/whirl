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
  AsyncStorage
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Amplify, { API, Auth } from 'aws-amplify';

import Input from '../Input';
import Button from '../Button';
import { colors, fonts } from '../../theme';

/**
 * Class is deprecated.
 */
class TodoInput extends Component {
  state = {
    todo: '',
    allTodo: [],
    modalVisible: false,
    backgroundSource:
      'https://source.unsplash.com/collection/1065412/900x1600/daily',
    User: ''
  };

  // replace with loading email from storage
  getEmail = (err, content) => {
    if (err) {
      console.log(err);
    } else {
      var email = content[3]['Value'];
      this.setState({
        User: email.replace('@', '.at.')
      });
    }
  };

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    user.getUserAttributes(this.getEmail);
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null) {
            this.setState({
              backgroundSource: keyvalue
            });
            console.log(keyvalue);
          } else {
            console.log('TodoInput: no backgroundSource item in storage');
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
  onChangeText = value => {
    console.log(value);
    this.setState({
      todo: value
    });
  };

  /**
   * Add todo item to database
   */
  todoAddedHandler = () => {
    if (this.state.todo.trim() === '') return;

    this.saveNote();
  };

  // Create a new Note according to the columns we defined earlier
  async saveNote() {
    var date = new Date();
    let newNote = {
      body: {
        Date: date.getTime(),
        Completed: 'false',
        User: this.state.User,
        Content: this.state.todo.trim()
      }
    };
    const path = '/Todo/';

    console.log(newNote.body.User);
    console.log(newNote.body.Content);
    console.log(newNote.body.Completed);
    console.log(newNote.body.Date);

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put('TodoCRUD', path, newNote);
      console.log('response from saving note: ' + JSON.stringify(apiResponse));
      this.setState({ apiResponse });
      this.props.onTodoAdded;
      this.forceUpdate;
    } catch (e) {
      console.log(e);
    }
  }

  updateData = data => {
    console.log(data);
    alert('come back status: ' + data);
    this.setState({
      modalVisible: data
    });
  };

  render() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.todoButton}
            onPress={() =>
              this.props.navigation.navigate('MyModal', {
                updateData: this.updateData
              })
            }
          >
            <Text style={styles.todoInput}>New Todo</Text>
            <Image
              source={require('../../assets/icons/add.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
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
  button: {
    // flex: 1,
    // top: '-50%',
    justifyContent: 'center',
    alignItems: 'center'
    // margin: 60,
  },
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

export default TodoInput;
