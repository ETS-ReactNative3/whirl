import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';


class TodoInput extends Component {
    state = {
        todo: '',
        allTodo: []
    }

    // creates a method where the javascript 'this' keyword always
    // refers to the class
    todoChangedHandler = val => {
        this.setState({
        todo: val
        })
    }

    todoAddedHandler = () => {
        if (this.state.todo.trim() === "") return;
    
        
        this.props.onTodoAdded(this.state.todo);
    }

    render() {
        return (
        <View style = {styles.inputContainer}>
            <TextInput 
                placeholder = "New Todo"
                value={this.todo} 
                onChangeText={this.todoChangedHandler}
                style = {styles.todoInput}
            />
            <Button
                title = "+"
                style = {styles.placeButton}
                onPress = {this.todoAddedHandler}
                
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        // width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    todoInput: {
        width: '70%',
        fontSize: 20,
        color: '#ffffff',
    },
    
    todoButton: {
        width: '30%',
        color: '#000000'
    },
})

export default TodoInput;
