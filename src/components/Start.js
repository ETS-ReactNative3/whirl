import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Constants from '../constants';
import RNFetchBlob from 'react-native-fetch-blob';

class Start extends Component {
  state = {
    image: '',
    loading: true
  };

  componentDidMount() {
    let dirs = RNFetchBlob.fs.dirs;
    for (link in Constants.BACKGROUNDS) {
      RNFetchBlob.config({
        session: 'backgrounds',
        fileCache: true,
        path: dirs.DocumentDir + '/Backgrounds/' + link + '.jpg',
        appendExt: 'jpg'
      })
        .fetch('GET', Constants.BACKGROUNDS[link])
        .then(res => {
          this.setState({
            image:
              Platform.OS === 'android'
                ? 'file://' + res.path()
                : '' + res.path(),
            isLoading: false
          });
        });
    }

    this.props.navigation.navigate('Home');
  }

  render() {
    return <View />;
  }
}

export default Start;
