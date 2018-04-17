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
  ScrollView,
} from 'react-native';
import MainFocus from '../components/MainFocus/MainFocus';
import TodoInput from '../components/TodoInput/TodoInput';
import TodoList from '../components/TodoList/TodoList';
import Amplify, { Auth, API } from 'aws-amplify';
import { fonts } from '../theme';

export default class Homescreen extends Component {
  state = {
    name: '',
    greetingText: 'day',
    todos: [],
    loaded: false,
    user: {},
    backgroundSource: 'https://source.unsplash.com/collection/1065412/900x1600/daily',
    textColor: '#ffffff'
  }

printOut = (err, content) => {
  console.log(err)
  var name = content[2]["Value"]
  console.log(name)
  this.setState({
    name: name
  })
  this.storeName(this.state.name)
}

async storeName(name)  {
  try {
      await AsyncStorage.setItem('name', name);
  } catch (error) {
      console.log('error setting the name item in storage: ')
      console.log(error)
  }
}

 async componentDidMount() {
  const user = await Auth.currentAuthenticatedUser()
   this.setState({
     greetingText: this.getGreeting(),
     user,
     name: this.props.name,
     
   })
   
  try {
    const value = await AsyncStorage.getItem('backgroundSource').then((keyvalue) => {
    if (keyvalue !== null) {
        this.setState({
            backgroundSource: keyvalue,
        })
        console.log(keyvalue)
    } else {
        console.log('Home: no backgroundSource item in storage')
    }})
  } catch (error) {
    console.log('Home: theres been an error getting the backgroundSource item')
}

try {
  const value = await AsyncStorage.getItem('textColor').then((keyvalue) => {
  if (keyvalue !== null) {
      this.setState({
        textColor: keyvalue,
      })
      console.log("Home: successfully loaded textColor")
  } else {
      this.setState({
          textColor: '#ffffff',
      })
      console.log('Home: no textColor item in storage')
  }})
  } catch (error) {
  console.log('Home: theres been an error getting the textColor item')
}


try {
  const value = await AsyncStorage.getItem('name').then((keyvalue) => {
  if (keyvalue !== null) {
      this.setState({
        name: keyvalue,
      })
      console.log("Home: successfully loaded name")
  } else {
    console.log('Home: no name item in storage')
    user.getUserAttributes(this.printOut)
  }})
  } catch (error) {
  console.log('Home: theres been an error getting the name item')
  console.log(error)
}

   
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

  // getTextColor() {
  //   return (String) (this.state.textColor)
  // }

  

  render() {

    const textColorVariable = {
      color: this.state.textColor,
    }

    return (
      <ImageBackground
          style={styles.image}
          source={{url: this.state.backgroundSource}}
          imageStyle={{resizeMode: 'cover'}}
      >

      {/* Add a default ImageBackground here whilst the one above loads? */}
      {/* {defaultBackground} */}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
       <View>
         <View style={styles.headerBar}>
          <TouchableOpacity style={styles.headerMenu} onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Image 
              source={require('../assets/menuIconPink.png')}
              style={{width: 30, height: 30}}          
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
        <View style={styles.container}>
          {/* Greeting */}
          <Text style={[styles.header, textColorVariable]}>
            Good {this.state.greetingText}, {"\n"}
            {this.state.name}
          </Text>

          {/* Main Focus */}
          <View style={styles.mainFocus}>
            <MainFocus onMainFocusAdded={this.mainFocusAddedHandler} color={this.state.textColor} />
          </View>

          {/* Todo list */}
          <View style={styles.todos}>
            <Text style={[styles.TodoHeader, textColorVariable]}>
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
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowRadius: 1,
    fontSize: 45,
    textShadowOffset: {width: 0.5, height: 0.5},
    fontFamily: fonts.bold,
  },
  container: {
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



