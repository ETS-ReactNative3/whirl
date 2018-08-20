import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import MainFocusInput from './MainFocusInput';
import TodayFocus from './TodayFocus';

class MainFocus extends Component {
  state = {
    focus: '',
    focusAdded: false
  };

  /**
   * load the focus item from local storage
   */
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('focus').then(keyvalue => {
        if (keyvalue !== null) {
          this.setState({
            focus: keyvalue,
            focusAdded: true
          });
          console.log(keyvalue);
        } else {
          console.log('no focus item in storage');
        }
      });
    } catch (error) {
      console.log('theres been an error getting the focus item');
    }
  }

  /**
   * save the focus item to local storage
   * @param {String} focus
   */
  async storeFocus(focus) {
    try {
      await AsyncStorage.setItem('focus', focus);
    } catch (error) {
      console.log('error setting the focus item');
    }
  }

  /**
   * remove the focus item from local storage
   */
  async removeStorage() {
    try {
      await AsyncStorage.removeItem('focus');
    } catch (error) {
      console.log('error removing focus from storage');
    }
    try {
      await AsyncStorage.removeItem('strikethrough');
    } catch (error) {
      console.log('error removing strikethrough from storage');
    }
  }

  /**
   * on changing the focus, set the state to the new value
   * and store the focus in
   */
  focusChangedHandler = val => {
    this.setState({
      focus: val
    });
  };

  /**
   * when a new focus is added, set the state to indicate a focus has been
   * added (for choosing which view to display) and store the new focus
   * to local storage. Add the new focus to the state.
   */
  focusAddedHandler = focus => {
    this.setState({
      focusAdded: !this.state.focusAdded
    });
    this.storeFocus(focus);
    this.focusChangedHandler(focus);
  };

  /**
   * Update state to show no focus currently added.
   * Remove focus from local storage.
   * Update focus in the state to be an empty string
   */
  focusDeletedHandler = () => {
    this.setState({
      focusAdded: !this.state.focusAdded
    });
    const res = this.removeStorage();
    console.log(res);
    this.focusChangedHandler('');
  };

  render() {
    const focusText = this.state.focusAdded ? (
      // display when a focus has been added
      <TodayFocus
        todaysFocus={this.state.focus}
        onDeletePressed={this.focusDeletedHandler}
      />
    ) : (
      // display when no focus added yet
      <MainFocusInput onFocusAdded={this.focusAddedHandler} />
    );

    return <View style={styles.inputContainer}>{focusText}</View>;
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center'
  }
});

export default MainFocus;
