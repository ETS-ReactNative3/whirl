import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

class RequireName extends Component {
    state = {
        name: ''
    }

    nameChangedHandler = val => {
        this.setState({
            name: val
        })
    }

    nameAddedHandler = () => {
        if (this.state.name.trim() === "") return;
        
        this.props.onNameAdded(this.state.name);
    }

    render() {
        return (
            <View style={styles.container}>
                
                <Text style={styles.header}> Please enter your name: </Text>
                <View style={styles.inputContainer}>
                <TextInput 
                    placeholder = "Name"
                    placeholderTextColor = "#808080"
                    value={this.name} 
                    onChangeText={this.nameChangedHandler}
                    style = {styles.nameInput}
                    clearTextOnFocus={false}
                    multiline = {true}
                />
                <TouchableOpacity
                    style = {styles.nameButton}
                    onPress = {this.nameAddedHandler}
                >
                    <Text style={styles.buttonText}> + </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }


}

export default RequireName;

const styles = StyleSheet.create({
    container: {
        top: '50%',
    },
    inputContainer: {
        // flex: 1,
        // width: "100%",
        marginTop: 20,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: 'bold',
      textShadowColor: '#000000',
      textShadowRadius: 1,
      fontSize: 45,
      textShadowOffset: {width: 0.5, height: 0.5},
      fontFamily: 'Helvetica Neue',
    },
    nameInput: {
        fontSize: 20,
        color: '#ffffff',
        textAlignVertical: 'top',
        textAlign: 'center',
        padding: 20
    },
    nameButton: {
        padding: 5,
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