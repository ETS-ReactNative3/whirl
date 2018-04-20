import React, { Component } from "react";
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
} from "react-native";

// components
import MainFocus from "../components/MainFocus/MainFocus";
import TodoInput from "../components/Todo/TodoInput";
import TodoList from "../components/Todo/TodoList";
// import Background from "../components/Background";


import Amplify, { Auth, API } from "aws-amplify";
import { fonts } from "../theme";

export default class Homescreen extends Component {
  state = {
    name: "",
    greetingText: "day",
    todos: [],
    loaded: false,
    user: {},
    backgroundSource:
      "https://source.unsplash.com/collection/1065412/900x1600/daily",
    textColor: "#ffffff"
  };

  /**
   * callback function for getting user attributes.
   * This function specifically gets and stores the given_name of the user.
   */
  getName = (err, content) => {
    console.log(err);
    var name = content[2]["Value"];
    console.log(name);
    this.setState({
      name: name
    });
    this.storeName(this.state.name);
  };

  /**
   * Store the given_name of the user to async storage
   * @param {String} name
   */
  async storeName(name) {
    try {
      await AsyncStorage.setItem("name", name);
    } catch (error) {
      console.log("error setting the name item in storage: ");
      console.log(error);
    }
  }

  /**
   * Get the current authenticated user and set state values that rely on function output.
   *
   * Loads the required items from async storage; backgroundSource, given_name,
   * and textColor.
   */
  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({
      greetingText: this.getGreeting(),
      user,
      name: this.props.name
    });

    // load the url backgroundSource from local storage
    try {
      const value = await AsyncStorage.getItem("backgroundSource").then(
        keyvalue => {
          if (keyvalue !== null) {
            this.setState({
              backgroundSource: keyvalue
            });
            console.log("Home: background source: " + keyvalue);
          } else {
            console.log("Home: no backgroundSource item in storage");
          }
        }
      );
    } catch (error) {
      console.log(
        "Home: theres been an error getting the backgroundSource item: " + error
      );
    }

    // load the hex code string textColor from local storage
    try {
      const value = await AsyncStorage.getItem("textColor").then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            textColor: keyvalue
          });
          console.log("Home: successfully loaded textColor");
        } else {
          this.setState({
            textColor: "#ffffff"
          });
          console.log("Home: no textColor item in storage");
        }
      });
    } catch (error) {
      console.log(
        "Home: theres been an error getting the textColor item: " + error
      );
    }

    // load the string given_name from local storage
    try {
      const value = await AsyncStorage.getItem("name").then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            name: keyvalue
          });
          console.log("Home: successfully loaded name");
        } else {
          console.log("Home: no name item in storage");
          user.getUserAttributes(this.getName);
        }
      });
    } catch (error) {
      console.log("Home: theres been an error getting the name item: " + error);
    }
  }

  /**
   * work out which greeting to give the user out of:
   * morning, afternoon, evening, depending on the time of day.
   */
  getGreeting() {
    var date = new Date();
    var hour = date.getHours();
    if (hour > 17) {
      return "evening";
    } else if (hour > 11) {
      return "afternoon";
    } else {
      return "morning";
    }
  }

  /**
   * concat a new todo item to the todo items array
   */
  todoAddedHandler = todo => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.concat({
          key: this.state.todos.length,
          value: todo
        })
      };
    });
  };

  /**
   * delete a todo item
   *
   * removes the todo item from the array storing all todo items, by using its key
   */
  todoDeletedHandler = key => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => {
          return todo.key !== key;
        })
      };
    });
  };

  render() {
    // use const to store the current text color.
    // neccessary for overriding textColor in any style presets.
    const textColorConst = {
      color: this.state.textColor
    };

    return (
      <ImageBackground
        style={styles.image}
        source={{ url: this.state.backgroundSource }}
        imageStyle={{ resizeMode: "cover" }}
      >
        {/* Add a default ImageBackground here whilst the one above loads? */}
        {/* {defaultBackground} */}

        {/* TouchableWithoutFeedback expects to have only one child element. Therefore 
          wrap everything in a single view */}
        <View style={{ flex: 1 }}>
          {/* Header bar for the homescreen. Contains the button for the drawer menu */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.headerMenu}
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Image
                source={require("../assets/icons/menuPink.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>

          {/* Page content wrapped in a scroll view */}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          >
            {/* Greeting */}
            <Text style={[styles.header, textColorConst]}>
              Good {this.state.greetingText}, {"\n"}
              {this.state.name}
            </Text>

            {/* Main Focus */}
            <View style={styles.mainFocus}>
              <MainFocus color={this.state.textColor} />
            </View>

            {/* Todo list */}
            <View style={styles.todos}>
              <Text style={[styles.TodoHeader, textColorConst]}>Todo:</Text>
              <TodoInput onTodoAdded={this.todoAddedHandler} />
              <TodoList
                todos={this.state.todos}
                onItemDeleted={this.todoDeletedHandler}
                style={styles.TodoList}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: null,
    width: null
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowRadius: 1,
    fontSize: 45,
    textShadowOffset: { width: 0.5, height: 0.5 },
    fontFamily: fonts.bold
  },
  mainFocusHeader: {
    padding: 15,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 30,
    fontFamily: "Helvetica Neue"
  },
  TodoHeader: {
    padding: 5,
    color: "#ffffff",
    fontSize: 30,
    textShadowColor: "#000000",
    textShadowRadius: 3,
    textAlign: "left",
    fontWeight: "bold",
    textShadowOffset: { width: 1, height: 1 }
  },
  headerBar: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 20
  },
  headerMenu: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
    marginLeft: 5
  },
  TodoList: {
    marginBottom: 30
  },
  mainFocus: {
    alignItems: "center"
  },
  todos: {
    marginLeft: 10,
    marginRight: 10
  }
});
