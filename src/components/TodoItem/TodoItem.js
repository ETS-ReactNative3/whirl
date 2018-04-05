import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const TodoItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Text style={styles.todoText}>{props.todo}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        margin: 5,
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    todoText: {
        color: '#ffffff',
    }
})

export default TodoItem;