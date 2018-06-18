import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Modal
} from 'react-native';

import TodoList from './TodoList';

import { API } from 'aws-amplify';

import ModalScreen from '../ModalScreen';

class Todo extends Component {
  state = {
    apiResponse: '',
    isLoading: true,
    todoItemCount: 0,
    todoAdded: false,
    uniqueValue: 1,
    backgroundSource: '',
    modalVisible: false
  };

  /**
   * Load users email address to get their todo items from the database
   */
  async componentDidMount() {
    try {
      const value = AsyncStorage.getItem('email').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            email: keyvalue
          });
          this.getData();
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
      this.setState({
        isLoading: false
      });
    }
  }

  /**
   * Load the users data from the database
   */
  async getData() {
    this.setState({
      isLoading: true
    });
    const path = '/TodoItems/' + this.state.email;
    try {
      const apiResponse = await API.get('TodoItemsCRUD', path);
      this.setState({
        apiResponse,
        isLoading: false
      });
    } catch (e) {
      console.log('error updating data: ');
      console.log(e);
      this.setState({
        isLoading: false
      });
    }
  }

  /**
   * Upon adding a new todo item, immediately add it to the array of todo items.
   *
   * @param todo is the new todo item
   */
  refreshData(todo) {
    console.log('Api response: ', this.state.apiResponse);
    var arr = this.state.apiResponse.push(todo.body);
    this.setState({
      apiResponse: this.state.apiResponse
    });
    this.forceRemount();
    this.props.scroll.scrollToEnd({ animated: false });
  }

  // used to quickly reflect the changes to the todo items array
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }));
  };

  /**
   * Add todo item to the array of todo items (so as to be faster, more responsive for the user),
   * and upload to the database.
   */
  todoAddedHandler = todo => {
    var date = new Date();

    let newNote = {
      body: {
        Content: todo.trim(),
        Completed: 'false',
        User: this.state.email,
        Date: date.getTime().toString()
      }
    };

    this.refreshData(newNote);
    this.saveNote(newNote);
  };

  // Create a new Note according to the columns we defined earlier
  async saveNote(note) {
    const path = '/TodoItems';

    // Use the API module to save the note to the database
    try {
      const apiResponse = API.put('TodoItemsCRUD', path, note).then(value => {
        if (value !== null) {
          if (value['success'] === undefined) {
            Alert.alert('There was an error saving your todo item.');
          }
          this.setState({ value });
        }
      });
    } catch (e) {
      console.log(e);
      Alert.alert('There was an error saving your todo item.');
    }
  }

  /**
   * Delete a todo item from the array containing todo items.
   * Used to quickly reflect changes to the todo items so as to make the
   * users experience more fluid.
   */
  async deleteTodo(date, user, index) {
    var array = [...this.state.apiResponse];
    array.splice(index, 1);
    this.setState({ apiResponse: array });
    this.forceRemount();

    const path = '/TodoItems/object/' + user + '/' + date;
    try {
      const apiResponse = await API.del('TodoItemsCRUD', path);
      console.log(
        'response from deleting note: ' + JSON.stringify(apiResponse)
      );
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * set whether the modal is visible
   * @param {boolean} visible
   */
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const apiR = this.state.apiResponse;

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ModalScreen
            Header={'Add a Todo'}
            InputType={'Todo'}
            InputPlaceholder={'New Todo'}
            autoCapitalize={'sentences'}
            ButtonTitle={'Add Todo'}
            addedHandler={this.todoAddedHandler.bind(this)}
            setModalVisible={this.setModalVisible.bind(this)}
          />
        </Modal>
        <Text style={styles.TodoHeader}>Todo:</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.todoButton}
            onPress={() => this.setModalVisible(true)}
          >
            <Text style={styles.todoInput}>New Todo</Text>
            <Image
              source={require('../../assets/icons/add.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
        {this.state.isLoading ? (
          <View>
            <ActivityIndicator style={{ flex: 1, paddingTop: 20 }} />
          </View>
        ) : (
          <TodoList
            style={styles.TodoList}
            apiResponse={apiR}
            onDeletePressed={this.deleteTodo.bind(this)}
            key={this.state.uniqueValue}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TodoList: {
    marginBottom: 30
  },
  TodoHeader: {
    padding: 5,
    color: '#ffffff',
    fontSize: 30,
    textShadowColor: '#000000',
    textShadowRadius: 3,
    textAlign: 'left',
    fontWeight: 'bold',
    textShadowOffset: { width: 1, height: 1 }
  },
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
  }
});

export default Todo;
