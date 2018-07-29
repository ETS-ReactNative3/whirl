import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Constants from '../constants';
import RNFetchBlob from 'react-native-fetch-blob';
import SplashScreen from 'react-native-splash-screen';

class Start extends Component {
  async componentDidMount() {
    // load & download the background that the user has set, or use default.
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null && keyvalue !== undefined) {
            this.setState({
              backgroundSource: keyvalue,
              imageKey: keyvalue
            });
          } else {
            console.log('Start: no backgroundSource item in storage');
            this.setState({
              backgroundSource: 'DEFAULT'
            });
          }

          // download the image
          let dirs = RNFetchBlob.fs.dirs;
          RNFetchBlob.config({
            session: 'backgrounds',
            fileCache: true,
            path:
              dirs.DocumentDir +
              '/Backgrounds/' +
              this.state.backgroundSource +
              '.jpg',
            appendExt: 'jpg'
          })
            .fetch('GET', Constants.BACKGROUNDS[this.state.backgroundSource])
            .then(() => {
              console.log('start: ', this.state.backgroundSource);
              this.props.navigation.navigate('Home');
            });
        }
      );
    } catch (error) {
      console.log(
        'Start: theres been an error getting the backgroundSource item'
      );
      console.log(error);

      // download default background
      let dirs = RNFetchBlob.fs.dirs;
      RNFetchBlob.config({
        session: 'backgrounds',
        fileCache: true,
        path: dirs.DocumentDir + '/Backgrounds/' + 'DEFAULT' + '.jpg',
        appendExt: 'jpg'
      }).fetch('GET', Constants.BACKGROUNDS['DEFAULT']);
    }
  }

  render() {
    return <View />;
  }
}

export default Start;
