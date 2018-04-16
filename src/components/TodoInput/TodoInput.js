import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Text, 
    Image,
    Modal,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableHighlight,
} from 'react-native';

import Input from '../Input';
import Button from '../Button';
import { colors, fonts } from '../../theme';


class TodoInput extends Component {
    state = {
        todo: '',
        allTodo: [],
        modalVisible: false,
    }

    todoChangedHandler = val => {
        this.setState({
        todo: val
        })
    }

    onChangeText = (key, value) => {
        console.log(key + " " + value)
        this.setState({
          [key]: value
        })
      }

    todoAddedHandler = () => {
        if (this.state.todo.trim() === "") return;
        
        
        this.props.onTodoAdded(this.state.todo);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        // alert('Modal has been closed.');
                    }}>
                    <ImageBackground
                        style={styles.image}
                        source={{url: 'https://source.unsplash.com/900x600/daily?nature'}}
                        imageStyle={{resizeMode: 'cover'}}
                    >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={styles.header}>
                            {/* close button in top left */}
                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}
                                style={styles.close}
                            >
                                <Image 
                                    source={require('../../assets/cross.png')}
                                    style={{width: 50, height: 50}}
                                />
                                
                            </TouchableHighlight>

                            {/* Page title */}
                            <Text style={styles.headerText}>
                                Add a Todo
                            </Text>

                            {/* add button in top right */}
                            <TouchableHighlight
                                onPress={() => {
                                    // add the new focus
                                    this.todoAddedHandler()
                                    
                                    // hide modal at the same time
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                                style={styles.add}
                            >
                                <Image 
                                    source={require('../../assets/tick.png')}
                                    style={{width: 50, height: 50}}
                                />
                                
                            </TouchableHighlight>

                        </View>
                        <View style={styles.container}>
                            <View style={styles.inputLineContainer}>
                                <Input 
                                    placeholder="New Todo"
                                    type='todo'
                                    onChangeText={this.onChangeText}
                                    value={this.state.focus}
                                    multiline={true}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    title='Add Todo'
                                    onPress={() => {
                                        // add the new focus
                                        this.todoAddedHandler()
                                        
                                        // hide modal at the same time
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    </ImageBackground>
                </Modal>
        
                <View style = {styles.inputContainer}>
                    <TouchableOpacity
                            style = {styles.todoButton}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}
                    >
                    {/* <TextInput 
                        placeholder = "New Todo"
                        placeholderTextColor = "#808080"
                        value={this.todo} 
                        onChangeText={this.todoChangedHandler}
                        style = {styles.todoInput}
                        clearTextOnFocus
                        ref={input => { this.textInput = input }}
                        multiline = {true}
                    /> */}
                    <Text style={styles.todoInput}>
                        New Todo
                    </Text>
                    <Image 
                        source={require('../../assets/add.png')}
                        style={{width: 40, height: 40}}
                    />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 50,
    },
    todoButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    todoInput: {
        marginTop: 7,
        marginLeft: 10,
        fontSize: 20,
        color: '#808080',
        textAlignVertical: 'top',
    },
    image: {
        flexGrow:1,
        height: null,
        width:null,
        // alignItems: 'center',
        // justifyContent:'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
    },
    headerText: {
        margin: 5,
        color: '#ffffff',
        // fontWeight: 'bold',
        fontSize: 30,
        fontFamily: fonts.light,
    },
    close: {
    },
    add: {
    },
    body: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 0.2,
        borderColor: colors.primary,
    },
    inputLineContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    button: {
        // flex: 1,
        // top: '-50%',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 60,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: 60,
        paddingHorizontal: 40
    },
})

export default TodoInput;
