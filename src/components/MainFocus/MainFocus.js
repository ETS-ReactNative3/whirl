import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, AsyncStorage } from 'react-native';
import MainFocusInput from '../MainFocusInput/MainFocusInput'; 
import TodayFocus from '../TodayFocus/TodayFocus';

class MainFocus extends Component {
    state = {
        focus: '',
        focusAdded: false,
    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('focus').then((keyvalue) => {
                if (keyvalue !== null) {
                    this.setState({
                        focus: keyvalue,
                        focusAdded: true,
                    })
                    console.log(keyvalue)
                } else {
                    console.log('no focus item in storage')
                }})
        } catch (error) {
            console.log('theres been an error getting the focus item')
        }
    }

    async storeFocus(focus)  {
        try {
            await AsyncStorage.setItem('focus', focus);
        } catch (error) {
            console.log('error setting the focus item')
        }
    }

    async removeStorage() {
        try {
            await AsyncStorage.removeItem('focus');
            return true;
        } catch (error) {
            console.log('error removing focus from storage');
            return false;
        }
    }

    focusChangedHandler = val => {
        this.setState({
            focus: val,
        })
        this.storeFocus(val);
        this.props.onMainFocusAdded(this.state.focus);
    }

    focusAddedHandler = (focus) => {
        this.setState({
            focusAdded: !this.state.focusAdded
        })
        this.storeFocus(focus)
        this.focusChangedHandler(focus);
    }

    focusDeletedHandler = () => {
        this.setState({
            focusAdded: !this.state.focusAdded,
        })
        const res = this.removeStorage();
        console.log(res)
        this.focusChangedHandler('')
    }

    render() {
        const focusText = this.state.focusAdded ? (
            // display when a focus has been added
            <TodayFocus todaysFocus={this.state.focus} onDeletePressed={this.focusDeletedHandler}/> 
          ) : (
            // display when no focus added yet 
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
        justifyContent: 'center',
    },
})

export default MainFocus;
