import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

class TodayFocus extends Component {
    state = {
        focus: this.props.todaysFocus,
        strikethrough: false,
        textColor: '#ffffff'
    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('strikethrough').then((keyvalue) => {
                if (keyvalue !== null) {
                    this.setState({
                        strikethrough: (keyvalue == 'true'),
                    })
                    console.log(keyvalue)
                } else {
                    console.log('getting strikethrough returned null')
                }});
        } catch (error) {
            console.log('theres been an error getting strikethrough')
        }

        try {
            const value = await AsyncStorage.getItem('textColor').then((keyvalue) => {
                if (keyvalue !== null) {
                    this.setState({
                        textColor: keyvalue,
                    })
                    console.log(keyvalue)
                } else {
                    console.log('todayfocus: getting textColor returned null')
                }});
        } catch (error) {
            console.log('todayfocus: theres been an error getting textColor')
        }
    }

    async storeStrikethrough(strikethrough) {
        try {
            await AsyncStorage.setItem('strikethrough', strikethrough.toString());
        } catch (error) {
            console.log('error setting strikethrough item')
        }
    }

    async removeStrikethrough() {
        try {
            await AsyncStorage.removeItem('strikethrough');
            return true;
        } catch (error) {
            console.log('error removing strikethrough from storage');
            return false;
        }
    }

    focusPressed = () => {
        this.setState({
            strikethrough: !this.state.strikethrough
        })
    }

    componentWillUnmount() {
        this.storeStrikethrough(this.state.strikethrough);
    }

    deletePressed() {
        if(!this.removeStrikethrough()) {
            Alert.alert('Something went wrong', 'Please try again')
        }
        this.props.onEditPressed
    }

    render() {
        const color = {
            color: this.state.textColor 
        }

        const text = this.state.strikethrough ? (
            <Text style={[styles.focusTextComplete, color]}>{this.props.todaysFocus}</Text>
        ) : (
            <Text style={[styles.focusText, color]}>{this.props.todaysFocus}</Text>
        )
        return (
            <TouchableOpacity style={styles.container} onPress={this.focusPressed}>
            {/* <TouchableOpacity style={styles.container} onPress={this.props.onDeletePressed}> */}
                <Text style={[styles.todayHeader, color]}> TODAY </Text>
                 {/* main focus */} 
                <View style={styles.focus}>
                    {text}
                </View>

                {/* delete button */}
                <TouchableOpacity onPress={this.props.onDeletePressed} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}> X </Text>
                </TouchableOpacity> 
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 10,
        padding: 8,
        alignItems: 'center',
        width: '100%',

    },
    todayHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    focusText: {
        borderColor: '#ffffff',
        borderBottomWidth: 2,
        color: '#ffffff',
        fontSize: 30,
        textShadowColor: '#000000',
        textAlign: 'center',
    },
    focusTextComplete: {
        borderColor: '#ffffff',
        borderBottomWidth: 2,
        color: '#ffffff',
        fontSize: 30,
        textShadowColor: '#000000',
        textAlign: 'center',
        textDecorationLine: 'line-through',
    },
    deleteButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        marginLeft: 5,
    },
    deleteButtonText: {
        color: '#ffffff',
    },
    focus: {
        flex: 1,
    }

})

export default TodayFocus;