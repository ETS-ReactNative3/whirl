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

    onChangeText = (value) => {
        console.log(value)
        this.setState({
          todo: value
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
                    }}
                    onShow={() => { this.textInput.focus() }}>
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
                                {/* <Input 
                                    placeholder="New Todo"
                                    type='todo'
                                    onChangeText={this.onChangeText}
                                    value={this.state.focus}
                                    multiline={true}
                                    ref={(input) => { this.textInput = input; }}
                                /> */}
                                <TextInput
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    style={styles.input}
                                    placeholder={"New Todo"}
                                    placeholderTextColor='#ffffff'
                                    onChangeText={(value) => this.onChangeText(value)}
                                    underlineColorAndroid='transparent'
                                    multiline={true}
                                    ref={(input) => { this.textInput = input; }}
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
        // marginBottom: 5,
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
    input: {
        color: '#ffffff',
        padding: 10,
        borderBottomWidth: 1.5,
        fontSize: 16,
        borderBottomColor: colors.primary,
        fontFamily: fonts.light,
        fontWeight: 'bold',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
})

export default TodoInput;
