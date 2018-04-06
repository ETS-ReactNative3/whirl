import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import MainFocusInput from '../MainFocusInput/MainFocusInput'; 
import TodayFocus from '../TodayFocus/TodayFocus';

class MainFocus extends Component {
    state = {
        focus: '',
        focusAdded: false,
    }

    focusChangedHandler = val => {
        this.setState({
            focus: val,
        })
        this.props.onMainFocusAdded(this.state.focus);
    }

    focusAddedHandler = (focusAdded) => {
        this.setState({
            focusAdded: !this.state.focusAdded
        })
        this.focusChangedHandler(focusAdded);
    }


    render() {
        const focusText = this.state.focusAdded ? (
            // true
            // <Text style={styles.focusText}>{this.state.focus}</Text>
            <TodayFocus todaysFocus={this.state.focus} /> 
          ) : (
            // false
            <MainFocusInput onFocusAdded={this.focusAddedHandler}/>
          )

        return (
            <View style = {styles.inputContainer}>
                {focusText}
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

    focusText: {
        // width: '80%',
        borderColor: '#ffffff',
        borderBottomWidth: 2,
        color: '#ffffff',
        fontSize: 30,
        textShadowColor: '#000000',
        textAlign: 'center',
    },
})

export default MainFocus;
