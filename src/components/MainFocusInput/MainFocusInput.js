import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

class MainFocusInput extends Component {
    state = {
        focus: ''
    }

    focusChangedHandler = val => {
        this.setState({
            focus: val
        })
    }


    render() {
        return (
            <View style = {styles.inputContainer}>
            <TextInput 
                placeholder = {this.focus}
                value={this.focus} 
                onChangeText={this.focusChangedHandler}
                style = {styles.focusInput}
                multiline = {true}
            />
            <Button
                title = "Add"
                style = {styles.focusButton}
                onPress = {this.focusAddedHandler}
                
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

    focusInput: {
        width: '80%',
        borderColor: '#ffffff',
        borderBottomWidth: 2,
        color: '#ffffff',
        fontSize: 30,
        textShadowColor: '#000000',
        textAlign:"center"
    },
    
    focusButton: {
        width: '20%',
        color: '#000000'
    },
})

export default MainFocusInput;
