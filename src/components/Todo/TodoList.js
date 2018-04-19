import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TodoItem from './TodoItem';

const todoList = props => {
    return (
        <FlatList 
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

export default todoList;