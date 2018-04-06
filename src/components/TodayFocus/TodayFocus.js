import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class TodayFocus extends Component {
    constructor(props) {
        super(props);
        state = {
            focus: this.props.todaysFocus
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.todayHeader}> TODAY </Text>
                <Text style={styles.focusText}>{this.props.todaysFocus}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: 20,
        paddingBottom: 10,
        width: "100%",
        alignItems: 'center'
    },
    todayHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        textDecorationLine: 'underline',
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

export default TodayFocus;