import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet
  } from 'react-native';
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import { logOut } from '../actions'
import { fonts, colors } from '../theme'

class LogOut extends Component {

    logout() {
        Auth.signOut()
          .then(() => {
            this.props.dispatchLogout()
          })
          .catch(err => {
            console.log('err: ', err)
          })
      }

    render() {
        return (
            <ImageBackground
                style={styles.image}
                // source={{url: 'https://source.unsplash.com/900x600/daily?landscape'}}
                // source = {{url: 'https://images.unsplash.com/collections/1065412/1600x900'}}
                //   source = {{url: 'https://source.unsplash.com/collection/1065412/900x1600/daily'}}
                source = {require('../assets/DefaultBackground.jpg')}
                imageStyle={{resizeMode: 'cover'}}
            >
                <TouchableOpacity style={styles.headerBar} onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                    <Image 
                        source={require('../assets/menuIcon.png')}
                        style={{width: 30, height: 30}}  
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logout.bind(this)}>
                    <Text style={styles.button}>Logout</Text>
                </TouchableOpacity>
                {/* onPress={this.logout.bind(this)} */}
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  })
  
const mapDispatchToProps = {
dispatchLogout: () => logOut()
}

const styles = StyleSheet.create({
    image: {
      flexGrow:1,
      height: null,
      width:null,
      alignItems: 'center',
      // justifyContent:'center',
    },
    headerBar: {
        position: 'absolute',
        top: 5,
        left: 5,
        flexDirection: 'row',
        flex: 1,
        padding: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: colors.primary,
        fontFamily: fonts.light,
        top: '40%',
        backgroundColor: '#ffffff',
        fontSize: 40,
        borderRadius: 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);