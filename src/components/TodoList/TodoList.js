import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TodoItem from '../TodoItem/TodoItem';

const todoList = props => {
    return (
        <FlatList 
            style = {styles.listContainer}
            data = {props.todos}
            renderItem = {(info) => (
                <TodoItem 
                    todo = {info.item.value}
                    onItemPressed = {() => props.onItemDeleted(info.item.key)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        // width: "100%",
      }
})

export default todoList;