import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    Picker,
    AsyncStorage
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import { fonts, colors } from '../theme'
import CONSTANTS from '../constants';


export default class Settings extends Component {
    state = {
        backgroundSource: '',
        textColor: '#ffffff',
        changes: false,
    }

    

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('backgroundSource').then((keyvalue) => {
                if (keyvalue !== null) {
                    this.setState({
                        backgroundSource: keyvalue,
                    })
                    console.log('settings: successfully loaded background source')
                } else {
                    this.setState({
                        backgroundSource: WALLPAPER,
                    })
                    console.log('Settings: no backgroundSource item in storage')
                }})
        } catch (error) {
            console.log('Settings: theres been an error getting the backgroundSource item')
        }

        try {
            const value = await AsyncStorage.getItem('textColor').then((keyvalue) => {
                if (keyvalue !== null) {
                    this.setState({
                        textColor: keyvalue,
                    })
                    console.log('settings: successfully loaded textColor')
                } else {
                    this.setState({
                        textColor: '#ffffff',
                    })
                    console.log('Settings: no textColor item in storage')
                }})
        } catch (error) {
            console.log('Settings: theres been an error getting the textColor item')
        }
    }

    setBackground(background) {
        this.setState({
            backgroundSource: background
        })
    }

    /**
     * Save changes to async storage.
     */
    saveChanges() {
        this.storeBackground(this.state.backgroundSource);
        this.storeTextColor(this.state.textColor);
        this.setState({
            changes: !this.state.changes
        })
    }

    async storeBackground(backgroundSource)  {
        try {
            await AsyncStorage.setItem('backgroundSource', backgroundSource);
        } catch (error) {
            console.log('error setting the background source item in storage: ')
            console.log(error)
        }
    }

    async storeTextColor(textColor)  {
        try {
            await AsyncStorage.setItem('textColor', textColor);
        } catch (error) {
            console.log('error setting the textColor item in storage: ')
            console.log(error)
        }
    }

    render() {
        /*
         * Save changes button
         * is only visible when a change has been made
        */
        const save_button = this.state.changes ? (
            <TouchableOpacity 
                style={styles.SaveButton}
                disabled={!this.state.changes}
                onPress={this.saveChanges.bind(this)}
            >
                <Text style={{color: '#ffffff', fontFamily: fonts.base}}> 
                    SAVE CHANGES
                </Text>
            </TouchableOpacity>
        ) : (
            <View/>
        )

        return (
            <ImageBackground
                style={styles.image}
                source = {require('../assets/DefaultBackground2.jpeg')}
                imageStyle={{resizeMode: 'cover'}}
            >

                {/* Header containing page title and menu icon */}
                <View style={styles.headerBar}>
                    <TouchableOpacity 
                        style={styles.headerMenu} 
                        onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    >
                        <Image 
                            source={require('../assets/menuIconPink.png')}
                            style={{width: 30, height: 30}}  
                        />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.headerTitle}>
                            Settings
                        </Text>
                        <Image 
                            source={require('../assets/settings.png')}
                            style={{width: 30, height: 30}}
                        />
                    </View>
                    <View style={styles.headerMenu}>
                        <Image
                            style={{width: 30, height: 30}}  
                        />
                    </View>
                </View>

                {/* The settings for the app:
                    - Backgrounds
                    - Text Color
                    - ?**Password**?
                */}
                <View style={styles.body}>
                    {/* Save changes button */}
                    {save_button}

                    {/* Change the backgrounds */}
                    <Text style={styles.sectionTitle}> Background </Text>
                    <View style={styles.backgroundSelection}>
                        <Picker
                            selectedValue={this.state.backgroundSource}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    backgroundSource: itemValue,
                                    changes: true,
                                })
                            }}
                            style={{width: 200}}
                            >
                            <Picker.Item label="Nature" value={CONSTANTS.BACKGROUNDS.NATURE} />
                            <Picker.Item label="Wallpaper (default)" value={CONSTANTS.BACKGROUNDS.WALLPAPER} />
                            <Picker.Item label="Landscapes" value={CONSTANTS.BACKGROUNDS.LANDSCAPES} />
                        </Picker>
                        <Image
                            source={{url: this.state.backgroundSource}}
                            style={styles.backgroundImage}
                        />
                    </View>


                    {/* Change the font colors on the homepage */}
                    <Text style={styles.sectionTitle}> Text color on homepage </Text>      
                    <View style={styles.backgroundSelection}>
                        <View style={styles.textImage}>
                            <Image
                                source={{url: this.state.backgroundSource}}
                                style={styles.backgroundImage}
                            />
                            <Text 
                                style={{
                                    color: this.state.textColor,
                                    position: 'absolute',
                                    top: 30,
                                    fontWeight: 'bold',
                                }}> Example </Text>
                        </View>
                        <Picker
                            selectedValue={this.state.textColor}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    textColor: itemValue,
                                    changes: true,
                                })
                            }}
                            style={{ width: 200,}}
                            itemStyle={{color:'white'}}
                            >
                            <Picker.Item label="Pink" value={colors.primary} color={colors.primary}/>
                            <Picker.Item label="White (default)" value={CONSTANTS.colors.white} />
                            <Picker.Item label="Black" value={CONSTANTS.colors.black} color={CONSTANTS.colors.black}/>
                        </Picker>
                        </View>

                    {/* Save changes button */}
                    {save_button}
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flexGrow:1,
        height: null,
        width:null,
    },
    headerMenu: {
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    headerBar: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 30,
        fontFamily: fonts.bold,
        color: '#2f2f2f'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    backgroundSelection: {
        borderColor: '#808080',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    body: {
        alignItems: 'center',
    },
    sectionTitle: {
        fontFamily: fonts.base,
        textAlign: 'center',
        fontSize: 20,
    },
    SaveButton: {
        backgroundColor: '#61B329',
        borderColor: 'green',
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
        width: '50%',
        justifyContent: 'space-around',
        marginBottom: 20,
        borderRadius: 10,
    },
    textColors: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    colorSelection: {
        borderColor: '#808080',
        borderTopWidth: 1,
    },
    backgroundImage: {
        width: 100, 
        height: 170,
        borderColor: '#808080',
        borderWidth: 0.4,
    },
    textImage: {
        alignItems: 'center',
    }
})