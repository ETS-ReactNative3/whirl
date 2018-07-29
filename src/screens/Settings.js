import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Picker,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { DrawerActions } from 'react-navigation';

import { fonts, colors } from '../theme';
import CONSTANTS from '../constants';
import StatusBar from '../components/StatusBar';
import RNFetchBlob from 'react-native-fetch-blob';
// import ProgressiveImage from 'react-progressive-image';

export default class Settings extends Component {
  state = {
    backgroundSource: 'DEFAULT',
    textColor: '#ffffff',
    changes: false,
    imageKey: 'DEFAULT',
    pickerEnabled: false
  };

  /**
   * load the current backgroundSource URL and textColor hex code from local storage
   */
  async componentDidMount() {
    // load backgroundSource
    try {
      const value = await AsyncStorage.getItem('backgroundSource').then(
        keyvalue => {
          if (keyvalue !== null && keyvalue !== undefined) {
            this.setState({
              backgroundSource: keyvalue,
              imageKey: keyvalue
            });
          } else {
            console.log('Settings: no backgroundSource item in storage');
            this.setState({
              backgroundSource: 'DEFAULT'
            });
          }
        }
      );
    } catch (error) {
      console.log(
        'Settings: theres been an error getting the backgroundSource item'
      );
      console.log(error);
    }

    // load textColor
    try {
      const value = await AsyncStorage.getItem('textColor').then(keyvalue => {
        if (keyvalue !== null && keyvalue !== undefined) {
          this.setState({
            textColor: keyvalue
          });
        } else {
          this.setState({
            textColor: '#ffffff'
          });
          console.log('Settings: no textColor item in storage');
        }
      });
    } catch (error) {
      console.log('Settings: theres been an error getting the textColor item');
    }

    let dirs = RNFetchBlob.fs.dirs;

    // load all backgrounds
    for (link in CONSTANTS.BACKGROUNDS) {
      RNFetchBlob.config({
        session: 'backgrounds',
        fileCache: true,
        path: dirs.DocumentDir + '/Backgrounds/' + link + '.jpg',
        appendExt: 'jpg'
      }).fetch('GET', CONSTANTS.BACKGROUNDS[link]).progress;
    }
    this.setState({
      pickerEnabled: !this.state.pickerEnabled
    });
  }

  /**
   * set the url of the backgound
   * @param {String} background
   */
  setBackground(background) {
    this.setState({
      backgroundSource: background
    });
  }

  /**
   * Save background and textcolor to async storage.
   */
  saveChanges() {
    this.storeBackground(this.state.backgroundSource);
    this.storeTextColor(this.state.textColor);
    this.setState({
      changes: !this.state.changes
    });
  }

  /**
   * store the backgroundSource URL to local storage
   * @param {String} backgroundSource
   */
  async storeBackground(backgroundSource) {
    try {
      await AsyncStorage.setItem('backgroundSource', backgroundSource);
    } catch (error) {
      console.log('error setting the background source item in storage: ');
      console.log(error);
    }
  }

  /**
   * store the textColor to local storage
   * @param {Sting} textColor
   */
  async storeTextColor(textColor) {
    try {
      await AsyncStorage.setItem('textColor', textColor);
    } catch (error) {
      console.log('error setting the textColor item in storage: ');
      console.log(error);
    }
  }

  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../assets/icons/settingsBlue.png')}
        style={{ height: 24, width: 24 }}
      />
    )
  };

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
        <Text style={{ color: '#ffffff', fontFamily: fonts.base }}>
          SAVE CHANGES
        </Text>
      </TouchableOpacity>
    ) : (
      // if no changes, then dont show anything. Just an empty view.
      <View />
    );

    let source =
      '' +
      CONSTANTS.BACKGROUND_LOCATIONS +
      this.state.backgroundSource +
      '.jpg';

    return (
      <ImageBackground
        style={styles.image}
        source={require('../assets/DefaultBackground3.jpg')}
        // source={{
        //   uri:
        //     '' +
        //     CONSTANTS.BACKGROUND_LOCATIONS +
        //     this.state.backgroundSource +
        //     '.jpg'
        // }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        {/* Header containing page title and menu icon */}
        <StatusBar backgroundColor="#ffffff" />
        <View style={styles.headerBar}>
          {/* open drawer menu button */}
          <TouchableOpacity
            style={styles.headerMenu}
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
          >
            <Image
              source={require('../assets/icons/menuPink.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>

          {/* Page title */}
          <View style={styles.title}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Image
              source={require('../assets/icons/settings.png')}
              style={{ width: 30, height: 30 }}
            />
          </View>

          {/* empty image used as a placeholder to allow title to be centered */}
          <View style={styles.headerMenu}>
            <Image style={{ width: 30, height: 30 }} />
          </View>
        </View>

        {/* The settings for the app:
            - Backgrounds
            - Text Color
        */}
        <View style={styles.body}>
          {/* Save changes button */}
          {save_button}

          {/* Change the backgrounds */}
          <View>
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}> Background </Text>
            </View>
            <View style={styles.backgroundSelection}>
              <Picker
                selectedValue={this.state.backgroundSource}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({
                    backgroundSource: itemValue,
                    changes: true
                  });
                }}
                style={{ width: 200 }}
                enabled={this.state.pickerEnabled}
              >
                {/* Background options */}
                <Picker.Item label="City" value={'CITY'} />
                <Picker.Item label="Above the trees" value={'ABOVETREE'} />
                <Picker.Item label="Nature" value={'NATURE'} />
                <Picker.Item label="Landscapes (default)" value={'DEFAULT'} />
                <Picker.Item label="Landscapes 2" value={'LANDSCAPES'} />
                <Picker.Item label="Wallpaper" value={'WALLPAPER'} />
                <Picker.Item label="Roads" value={'ROADS'} />
                <Picker.Item label="Space" value={'SPACE'} />
              </Picker>
              <Image
                source={{
                  uri:
                    '' +
                    CONSTANTS.BACKGROUND_LOCATIONS +
                    this.state.backgroundSource +
                    '.jpg'
                }}
                style={styles.backgroundImage}
                key={this.state.imageKey}
              />
            </View>
          </View>

          {/* Change the font colors on the homepage */}
          <View>
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}> Text color on homepage </Text>
            </View>
            <View style={styles.backgroundSelection}>
              {/* Example of how selected text color will look over the selected background */}
              <View style={styles.textImage}>
                <Image
                  source={{
                    uri:
                      '' +
                      CONSTANTS.BACKGROUND_LOCATIONS +
                      this.state.backgroundSource +
                      '.jpg'
                  }}
                  style={styles.backgroundImage}
                  key={this.state.imageKey}
                />
                {/* <ProgressiveImage
                  src={source}
                  placeholder="../assets/icons/settings.png"
                >
                  {(src, loading) => (
                    <img
                      style={{ opacity: loading ? 0.5 : 1 }}
                      src={src}
                      alt="an image"
                    />
                  )}
                </ProgressiveImage> */}
                <Text
                  style={{
                    color: this.state.textColor,
                    position: 'absolute',
                    top: 30,
                    fontWeight: 'bold'
                  }}
                >
                  {' '}
                  Example{' '}
                </Text>
              </View>

              {/* Picker to select the text Color */}
              <Picker
                selectedValue={this.state.textColor}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({
                    textColor: itemValue,
                    changes: true
                  });
                }}
                style={{ width: 200 }}
                itemStyle={{ color: 'white' }}
              >
                {/* text color options */}
                <Picker.Item
                  label="Pink"
                  value={colors.primary}
                  color={colors.primary}
                />
                <Picker.Item
                  label="White (default)"
                  value={CONSTANTS.colors.white}
                />
                <Picker.Item
                  label="Black"
                  value={CONSTANTS.colors.black}
                  color={CONSTANTS.colors.black}
                />
              </Picker>
            </View>
          </View>
          {/* Save changes button */}
          {save_button}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flexGrow: 1,
    height: null,
    width: null
  },
  headerMenu: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5
  },
  headerBar: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    alignItems: 'center'
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
    flex: 1
  },
  backgroundSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  body: {
    alignItems: 'center'
  },
  sectionTitle: {
    fontFamily: fonts.base,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  sectionBox: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomWidth: 1,
    borderColor: '#000000'
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
    borderRadius: 10
  },
  textColors: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  colorSelection: {
    borderColor: '#808080',
    borderTopWidth: 1
  },
  backgroundImage: {
    width: 100,
    height: 170,
    borderColor: '#808080',
    borderWidth: 0.4
  },
  textImage: {
    alignItems: 'center'
  }
});
