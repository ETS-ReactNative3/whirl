import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import TodoList from './TodoList';

import Amplify, { API, Auth } from 'aws-amplify';

import { colors, fonts } from '../../theme';
import Homescreen from '../../screens/Homescreen';

class Todo extends Component {
  state = {
    apiResponse: '',
    isLoading: true,
    todoItemCount: 0,
    todoAdded: false,
    uniqueValue: 1
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

  async getData() {
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
        isLoading: false
        // mountTodo: true
        // todoItemCount: apiResponse.length
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

  async refreshData(note) {
    var arr = this.state.apiResponse.push(note.body);
    this.setState({
      apiResponse: this.state.apiResponse
    });
    this.forceRemount();
    this.props.scroll.scrollToEnd({ animated: false });
    // this.props.scroll.scrollTo({x: 1000, y: , animated: false);
  }

  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }));
  };

  async deleteTodo(date, user, index) {
    var array = [...this.state.apiResponse];
    array.splice(index, 1);
    this.setState({ apiResponse: array });
    this.forceRemount();
    // this.props.scroll.scrollToEnd();
    console.log('delete index: ' + index);
    const path = '/TodoItems/object/' + user + '/' + date;
    console.log(path);
    try {
      const apiResponse = await API.del('TodoItemsCRUD', path);
      console.log(
        'response from deleting note: ' + JSON.stringify(apiResponse)
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const apiR = this.state.apiResponse;
    return (
      <View>
        <Text style={styles.TodoHeader}>Todo:</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.todoButton}
            onPress={() =>
              this.props.navigation.navigate('MyModal', {
                updateData: this.refreshData.bind(this)
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
