import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import TodoItem from './TodoItem';

class todoList extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  _renderItem = (item, index) => (
    <TodoItem
      item={item}
      todo={item.Content}
      user={item.User}
      strikethrough={item.Completed}
      onDeletePressed={() =>
        this.props.onDeletePressed(item.Date, item.User, index)
      }
    />
  );

  _keyExtractor = (item, index) => item.Date;

  render() {
    if (this.state.isLoading) {
      return <View />;
    }

    return (
      <FlatList
        data={this.props.apiResponse}
        keyExtractor={this._keyExtractor}
        renderItem={({ item, index }) => this._renderItem(item, index)}
      />
    );
  }
}

export default todoList;
