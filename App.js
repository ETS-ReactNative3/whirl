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
import MainFocusInput from './src/components/MainFocusInput/MainFocusInput';
import TodoInput from './src/components/TodoInput/TodoInput';
import TodoList from './src/components/TodoList/TodoList';




export default class App extends Component {
  state = {
    name: 'Conor',
    greetingText: 'day',
    mainFocus: null,
    todos: []
  }

 componentWillMount() {
   this.setState({
     greetingText: this.getGreeting(),
   })
 }

  getGreeting() {
    var date = new Date();
    var hour = date.getHours();
    if (hour > 11 && hour < 19) {
      return 'afternoon';
    } else if (hour > 18) {
      return 'evening';
    } else {
      return 'morning';
    }
  }

  todoAddedHandler = todo => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.concat({key: Math.random(), value: todo})
      }
    })
  }

  todoDeletedHandler = key => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => {
          return todo.key !== key;
        })
      };
    });
  }

  render() {
    return (
      <ImageBackground
          style={styles.image}
          // source={{url: 'https://source.unsplash.com/1600x900/daily?landscape'}}
          // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
          source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
          imageStyle={{resizeMode: 'cover'}}
      >
        <View style={styles.container}>
          <Text style = {styles.header}>
            Good {this.state.greetingText}, {"\n"}
            {this.state.name}. 
          </Text>
          <Text style={styles.mainFocusHeader}> What is your main focus for today? </Text>
          <MainFocusInput/>
          <Text style={styles.TodoHeader}>Todo:</Text>
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
    fontSize: 45
  },
  container: {
    flex: 1,
    top: '12%'
  },
  mainFocusHeader: {
    padding: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    textShadowColor: '#000000'
  },
  TodoHeader: {
    padding: 10,
    color: '#ffffff',
    fontSize: 30,
    textShadowColor: '#000000',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});



