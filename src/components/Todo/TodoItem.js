import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Alert
} from 'react-native';
import { fonts, colors } from '../../theme';
import { API } from 'aws-amplify';

class TodoItem extends Component {
  state = {
    item: this.props.item,
    todo: '',
    strikethrough: this.props.strikethrough === 'false',
    user: ''
  };

  onItemPressed = () => {
    this.setState({
      strikethrough: !this.state.strikethrough
    });

    // update strikethough in dynamo db
    let newNote = {
      body: {
        Content: this.state.item.Content.trim(),
        Completed: this.state.strikethrough.toString(),
        User: this.state.item.User,
        Date: this.state.item.Date
      }
    };
    this.saveNote(newNote);
  };

  // Create a new Note according to the columns we defined earlier
  async saveNote(note) {
    const path = '/TodoItems';
    // Use the API module to save the note to the database
    try {
      const apiResponse = API.put('TodoItemsCRUD', path, note).then(value => {
        console.log('value ', value);
        if (value !== null) {
          if (value['success'] === undefined) {
            Alert.alert('There was an error updating your todo item..');
          }
          this.setState({ value });
        }
      });
    } catch (e) {
      console.log(e);
      Alert.alert('There was an error updating your todo item.');
    }
  }

  render() {
    const text = this.state.strikethrough ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Image
          source={require('../../assets/icons/circle.png')}
          style={{ width: 8, height: 8, marginRight: 10, marginLeft: 5 }}
        />
        <Text style={styles.todoText}>{this.props.todo}</Text>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Image
          source={require('../../assets/icons/circle.png')}
          style={{ width: 8, height: 8, marginRight: 10, marginLeft: 5 }}
        />
        <Text style={styles.todoTextCompleted}>{this.props.todo}</Text>
      </View>
    );
    return (
      <TouchableOpacity onPress={this.onItemPressed} style={styles.listItem}>
        {/* Todo Item */}
        {text}

        {/* delete button */}
        <TouchableOpacity
          onPress={this.props.onDeletePressed}
          style={styles.deleteButton}
        >
          <Image
            source={require('../../assets/icons/cross.png')}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  todoText: {
    color: '#ffffff',
    fontFamily: fonts.base,
    fontSize: 20,
    // textAlign: 'left',
    paddingRight: 70
    // paddingLeft: 10
  },
  todoTextCompleted: {
    color: '#ffffff',
    textDecorationLine: 'line-through',
    fontFamily: fonts.base,
    fontSize: 20,
    // textAlign: 'left',
    paddingRight: 70
  },
  deleteButton: {
    alignItems: 'center',
    marginLeft: -100,
    paddingLeft: 20
  }
});

export default TodoItem;
