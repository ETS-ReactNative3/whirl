import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';


class TodoInput extends Component {
    state = {
        todo: '',
        allTodo: []
    }

    todoChangedHandler = val => {
        this.setState({
        todo: val
        })
    }

    todoAddedHandler = () => {
        if (this.state.todo.trim() === "") return;
        
        
        this.props.onTodoAdded(this.state.todo);
        this.textInput.clear(0);
    }

    render() {
        return (
        <View style = {styles.inputContainer}>
            <TextInput 
                placeholder = "New Todo"
                placeholderTextColor = "#808080"
                value={this.todo} 
                onChangeText={this.todoChangedHandler}
                style = {styles.todoInput}
                clearTextOnFocus
                ref={input => { this.textInput = input }}
                multiline = {true}
            />
            <TouchableOpacity
                style = {styles.todoButton}
                onPress = {this.todoAddedHandler}
            >
                <Text style={styles.buttonText}> + </Text>
            </TouchableOpacity>
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
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 50,
    },

    todoInput: {
        marginLeft: 10,
        width: '80%',
        fontSize: 20,
        color: '#ffffff',
        textAlignVertical: 'top',
    },
    
    todoButton: {
        width: '10%',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        alignItems: 'center',
        fontWeight: 'bold',
    }
})

export default TodoInput;
