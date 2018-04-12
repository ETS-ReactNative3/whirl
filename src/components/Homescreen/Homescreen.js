import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  TextInput,
  FlatList
} from 'react-native';
import MainFocus from '../MainFocus/MainFocus';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';

export default class Homescreen extends Component {
  state = {
    name: '',
    greetingText: 'day',
    todos: []
  }

 componentDidMount() {
   this.setState({
     greetingText: this.getGreeting(),
     name: this.props.name,
   })
  //  this.getTodoList();
 }

//  async getTodoList() {
//    try {
//       const value = await AsyncStorage.getItem('todos').then((keyvalue) => {
//         if (keyvalue !== null) {
//             this.setState({
//                 todos: JSON.parse(keyvalue),
//             })
//             console.log(keyvalue)
//         } else {
//             console.log('no todos item in storage')
//         }})
//   } catch (error) {
//     console.log('theres been an error getting the todos item')
//     console.log(error);
//   } 
//  }

//  async storeTodoList(todos) {
//     try {
//       console.log(JSON.stringify(todos));
//       await AsyncStorage.setItem('todos', JSON.stringify(todos));
//   } catch (error) {
//       console.log('error setting the todos item')
//       console.log(JSON.stringify(todos))
//       console.log(error);
//   }
//  }

  getGreeting() {
    var date = new Date();
    var hour = date.getHours();
    if (hour > 17) {
      return 'evening';
    } else if (hour > 11) {
      return 'afternoon';
    } else {
      return 'morning';
    }
  }

  mainFocusAddedHandler = focus => {
    this.setState({
      mainFocus: focus,
    })
  }

  todoAddedHandler = todo => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.concat({key: this.state.todos.length, value: todo})
      }
    })
    // this.storeTodoList(this.state.todos);
  }

  todoDeletedHandler = key => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => {
          return todo.key !== key;
        })
      };
    });
    // this.storeTodoList(this.state.todos);
  }

  render() {
    return (
      <ImageBackground
          style={styles.image}
          // source={{url: 'https://source.unsplash.com/900x600/daily?landscape'}}
          // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
        //   source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
          source = {require('../../../resources/img/DefaultBackground.jpg')}
          imageStyle={{resizeMode: 'cover'}}
      >
        <View style={styles.container}>
          {/* Greeting */}
          <Text style = {styles.header}>
            Good {this.state.greetingText}, {"\n"}
            {this.state.name}
          </Text>

          {/* Main Focus */}
          <MainFocus onMainFocusAdded={this.mainFocusAddedHandler}/>

          {/* Todo list */}
          <Text style={styles.TodoHeader}>
            Todo:
          </Text>
          <TodoInput onTodoAdded={this.todoAddedHandler}/>
          <TodoList
            todos = {this.state.todos}
            onItemDeleted={this.todoDeletedHandler}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flexGrow:1,
    height: null,
    width:null,
    alignItems: 'center',
    // justifyContent:'center',
  },
  header: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowRadius: 1,
    fontSize: 45,
    textShadowOffset: {width: 0.5, height: 0.5},
    fontFamily: 'Helvetica Neue',
  },
  container: {
    top: '12%'
  },
  mainFocusHeader: {
    padding: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Helvetica Neue',
  },
  TodoHeader: {
    padding: 5,
    color: '#ffffff',
    fontSize: 30,
    textShadowColor: '#000000',
    textShadowRadius: 3,
    textAlign: 'left',
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
  },
});



