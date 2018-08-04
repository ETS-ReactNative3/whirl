import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import TodoItem from './TodoItem';

class todoList extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    this.setState({
      apiResponse: this.props.apiResponse
    });
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: ds.cloneWithRows(this.props.apiResponse),
      isLoading: !this.state.isLoading
    });
  }

  render() {
    if (this.state.isLoading) {
      return <View />;
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData, sectionId, rowId) =>
          rowId !== this.props.apiResponse.length - 1 ? (
            <TodoItem
              item={rowData}
              todo={rowData.Content}
              user={rowData.User}
              strikethrough={rowData.Completed}
              onDeletePressed={() =>
                this.props.onDeletePressed(rowData.Date, rowData.User, rowId)
              }
            />
          ) : (
            <TodoItem
              item={rowData}
              todo={rowData.Content}
              user={rowData.User}
              strikethrough={rowData.Completed}
              onDeletePressed={() =>
                this.props.onDeletePressed(rowData.Date, rowData.User, rowId)
              }
              padding={true}
            />
          )
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default todoList;
