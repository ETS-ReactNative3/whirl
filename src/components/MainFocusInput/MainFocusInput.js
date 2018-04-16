import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from 'react-native';

import Input from '../Input';
import Button from '../Button';
import { colors, fonts } from '../../theme';

class MainFocusInput extends Component {
    state = {
        focus: '',
        modalVisible: false,
    }

    focusChangedHandler = val => {
        this.setState({
            focus: val
        })
        console.log(val)
    }

    onChangeText = (value) => {
        console.log(value)
        this.setState({
          focus: value
        })
    }

    focusAddedHandler = () => {
        if (this.state.focus.trim() === "") return;
        
        this.props.onFocusAdded(this.state.focus);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }

    render() {
        return (
            <View>
                <View>
                <Text style={styles.mainFocusHeader}> What is your main focus for today? </Text>
                </View>
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
                                Add a main focus
                            </Text>

                            {/* add button in top right */}
                            <TouchableHighlight
                                onPress={() => {
                                    // add the new focus
                                    this.focusAddedHandler()
                                    
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
                                    placeholder="Focus"
                                    type='focus'
                                    onChangeText={this.onChangeText}
                                    value={this.state.focus}
                                    multiline={true}
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
                                    title='Add Focus'
                                    onPress={() => {
                                        // add the new focus
                                        this.focusAddedHandler()
                                        
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

                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    style={styles.focusInput}>
                </TouchableOpacity>
            </View>

            
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: 60,
        paddingHorizontal: 40
      },
    focusInput: {
        // width: '90%',
        borderColor: '#ffffff',
        borderBottomWidth: 2,
        paddingTop: 25,
        marginBottom: 10,
    },
    mainFocusHeader: {
        padding: 15,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 30,
        textShadowColor: '#000000',
        fontFamily: fonts.light,
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

export default MainFocusInput;
