import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

class MainFocusInput extends Component {
    state = {
        focus: '',
    }

    focusChangedHandler = val => {
        this.setState({
            focus: val
        })
    }

    focusAddedHandler = () => {
        if (this.state.focus.trim() === "") return;
        
        this.props.onFocusAdded(this.state.focus);
    }

    render() {
        return (
            <View>
                <View>
                <Text style={styles.mainFocusHeader}> What is your main focus for today? </Text>
                </View>
                <View style = {styles.inputContainer}>
                    <TextInput 
                        placeholder = {this.focus}
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
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
    mainFocusHeader: {
        padding: 15,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 30,
        textShadowColor: '#000000'
      },
})

export default MainFocusInput;
