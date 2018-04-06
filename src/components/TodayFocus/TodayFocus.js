import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class TodayFocus extends Component {
    state = {
        focus: this.props.todaysFocus,
        strikethrough: false,
    }

    focusPressed = () => {
        this.setState({
            strikethrough: !this.state.strikethrough
        })
    }

    deletePressed() {
        this.props.onEditPressed
    }

    render() {
        const text = this.state.strikethrough ? (
            <Text style={styles.focusTextComplete}>{this.props.todaysFocus}</Text>
        ) : (
            <Text style={styles.focusText}>{this.props.todaysFocus}</Text>
        )
        return (
            <TouchableOpacity style={styles.container} onPress={this.focusPressed}>
                <Text style={styles.todayHeader}> TODAY </Text>
                 {/* main focus */} 
                {text}

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

})

export default TodayFocus;