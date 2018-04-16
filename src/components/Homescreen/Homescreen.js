import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import MainFocus from '../MainFocus/MainFocus';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import Amplify, { Auth, API } from 'aws-amplify';
import { fonts } from '../../theme';

export default class Homescreen extends Component {
  state = {
    name: '',
    greetingText: 'day',
    todos: [],
    loaded: false,
    user: {},
  }

printOut = (err, content) => {
  console.log(err)
  var name = content[2]["Value"]
  console.log(name)
  this.setState({
    name: name
  })
}

 async componentDidMount() {
  const user = await Auth.currentAuthenticatedUser()
   this.setState({
     greetingText: this.getGreeting(),
     user,
     name: this.props.name,
   })
   user.getUserAttributes(this.printOut)
  }


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
          source={{url: 'https://source.unsplash.com/900x600/daily?nature'}}
          // source={{uri: 'https://source.unsplash.com/900x600/daily?landscape'}}
          // uri = {this.state.loaded ? this.state.uri : ''}
          // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
          // source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
          // source = {require('../../assets/DefaultBackground.jpg')}
          // source = {{url: 'https://s3.amazonaws.com/123rf-chrome/images/44117949_xl.jpg'}}
          imageStyle={{resizeMode: 'cover'}}
          // onLoad={ ()=>{ this.setState({ loaded: true })}}
      >
       
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
       <View>
         <View style={styles.headerBar}>
          <TouchableOpacity style={styles.headerMenu} onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Image 
              source={require('../../assets/menuIconPink.png')}
              style={{width: 30, height: 30}}          
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
        <View style={styles.container}>
          {/* Greeting */}
          <Text style = {styles.header}>
            Good {this.state.greetingText}, {"\n"}
            {this.state.name}
          </Text>

          {/* Main Focus */}
          <View style={styles.mainFocus}>
            <MainFocus onMainFocusAdded={this.mainFocusAddedHandler} />
          </View>

          {/* Todo list */}
          <View style={styles.todos}>
            <Text style={styles.TodoHeader}>
              Todo:
            </Text>
            <TodoInput onTodoAdded={this.todoAddedHandler}/>
            <TodoList
              todos = {this.state.todos}
              onItemDeleted={this.todoDeletedHandler}
              style={styles.TodoList}
            />
          </View>
        </View>
        </ScrollView>
       </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flexGrow:1,
    height: null,
    width:null,
  },
  header: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowRadius: 1,
    fontSize: 45,
    textShadowOffset: {width: 0.5, height: 0.5},
    fontFamily: fonts.bold,
    
  },
  container: {
    // flex: 1,
    // top: '12%',
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
  headerBar: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
  },
  headerMenu: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    marginLeft: 5,
  },
  TodoList: {
    marginBottom: 30,
  },
  mainFocus: {
    alignItems: 'center',
  },
  todos: {
    marginLeft: 10,
    marginRight: 10,
  }
});



