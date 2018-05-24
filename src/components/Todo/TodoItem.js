import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import { fonts, colors } from '../../theme';

class TodoItem extends Component {
  state = {
    todo: '',
    strikethrough: this.props.strikethrough,
    user: ''
  };

  onItemPressed = () => {
    this.setState({
      strikethrough: !this.state.strikethrough
    });

    // update strikethough in dynamo db
  };

  render() {
    const text = !this.state.strikethrough ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-around'
        }}
      >
        {/* <Image
          source={require('../../assets/icons/circle.png')}
          style={{ width: 8, height: 8, marginRight: 10, marginLeft: 5 }}
        /> */}
        <Text style={styles.todoText}>{this.props.todo}</Text>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-around'
        }}
      >
        {/* <Image
          source={require('../../assets/icons/circle.png')}
          style={{
            width: 8,
            height: 8,
            marginRight: 5,
            marginLeft: 5
          }}
        /> */}
        <Text style={styles.todoTextCompleted}>{this.props.todo}</Text>
      </View>
    );
    return (
      <TouchableOpacity onPress={this.onItemPressed} style={styles.listItem}>
        {/* Bullet point */}
        <Image
          source={require('../../assets/icons/circle.png')}
          style={{ width: 8, height: 8, marginRight: 10, marginLeft: 5 }}
        />
        {/* <View style={{ marginRight: 10, marginLeft: 5 }} /> */}

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
    textAlign: 'left',
    paddingRight: 70
    // paddingLeft: 10
  },
  todoTextCompleted: {
    color: '#ffffff',
    textDecorationLine: 'line-through',
    fontFamily: fonts.base,
    fontSize: 20,
    textAlign: 'left',
    paddingRight: 70
  },
  deleteButton: {
    alignItems: 'center',
    marginLeft: -60
  }
});

export default TodoItem;
