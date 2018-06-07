import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import TodoInput from './TodoInput';
import TodoList from './TodoList';

import Amplify, { API, Auth } from 'aws-amplify';

import { colors, fonts } from '../../theme';

class Todo extends Component {
  state = {
    apiResponse: '',
    isLoading: true,
    todoItemCount: 0
  };

  async componentDidMount() {
    try {
      const value = AsyncStorage.getItem('email').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            email: keyvalue
          });
          console.log('Todo: successfully loaded email: ' + this.state.email);
          console.log('Todo: email loaded as: ' + keyvalue);
          this.updateData();
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

  async updateData() {
    this.setState({
      isLoading: true
    });
    console.log('getting list items');
    const path = '/TodoItems/' + this.state.email;
    console.log('todo path: ' + path);
    try {
      const apiResponse = await API.get('TodoItemsCRUD', path);
      console.log('api response 1: ');
      console.log(apiResponse);
      this.setState({
        apiResponse,
        isLoading: false,
        todoItemCount: apiResponse.length
      });
      console.log('state api response 2: ');
      console.log(this.state.apiResponse);
    } catch (e) {
      console.log('error updating data: ');
      console.log(e);
      this.setState({
        isLoading: false
      });
    }
  }

  async todoAdded() {
    const todoItemsUpdatedCount = this.state.todoItemCount + 1;
    console.log('Todo: in todoAdded');
    do {
      await this.updateData();
    } while (todoItemsUpdatedCount != this.state.todoItemCount);

    console.log(
      'updated count: ' +
        todoItemsUpdatedCount +
        ' | number downloaded: ' +
        this.state.todoItemCount
    );
  }

  async deleteTodo(date, user) {
    const path = '/TodoItems/object/' + user + '/' + date;
    console.log(path);
    try {
      const apiResponse = await API.del('TodoItemsCRUD', path);
      console.log(
        'response from deleting note: ' + JSON.stringify(apiResponse)
      );
      this.setState({
        apiResponse,
        isLoading: true
      });
    } catch (e) {
      console.log(e);
    }
    this.todoDeleted();
  }

  async todoDeleted() {
    const todoItemsUpdatedCount = this.state.todoItemCount - 1;
    do {
      await this.updateData();
    } while (todoItemsUpdatedCount != this.state.todoItemCount);

    console.log(
      'updated count: ' +
        todoItemsUpdatedCount +
        ' | number downloaded: ' +
        this.state.todoItemCount
    );
  }

  render() {
    const list = this.state.isLoading ? (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ActivityIndicator />
      </View>
    ) : (
      <TodoList
        style={styles.TodoList}
        apiResponse={this.state.apiResponse}
        onDeletePressed={this.deleteTodo.bind(this)}
      />
    );

    return (
      <View>
        <Text style={styles.TodoHeader}>Todo:</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.todoButton}
            onPress={() =>
              this.props.navigation.navigate('MyModal', {
                updateData: this.todoAdded.bind(this)
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
        {list}
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
    justifyContent: 'center',
    alignItems: 'center'
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

export default Todo;
