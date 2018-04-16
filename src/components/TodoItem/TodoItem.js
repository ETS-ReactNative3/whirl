import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';

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
                        <Image
                          source={require('../../assets/cross.png')}
                          style={{width: 40, height: 40}}
                        />
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
        paddingLeft:5,
        marginTop: 10,
        marginLeft: 5,
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
        alignItems: 'center',
    }
})

export default TodoItem;