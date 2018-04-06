import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      strikethrough: false,
    }
  }

  onItemPressed = () => {
    this.setState({
      strikethrough: !this.state.strikethrough
    })
  }

  render() {
    const text = !this.state.strikethrough ? (
      <Text style={styles.todoText}>{this.props.todo}</Text>
    ) : (
      <Text style={styles.todoTextCompleted}>{this.props.todo}</Text>
    )
      return (
              <TouchableOpacity onPress={this.onItemPressed} style={styles.listItem}>
                      {/* Todo Item */}
                      {text}

                      {/* delete button */}
                      <TouchableOpacity onPress={this.props.onItemPressed} style={styles.deleteButton}>
                        <Text style={styles.todoText}> X </Text>
                      </TouchableOpacity> 
              </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingRight:5,
        margin: 5,
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    todoText: {
        color: '#ffffff',
    },
    todoTextCompleted: {
        color: '#ffffff',
        textDecorationLine: 'line-through',
    },
    deleteButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5
    }
})

export default TodoItem;