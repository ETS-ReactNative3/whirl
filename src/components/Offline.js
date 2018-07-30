import React, { Component } from 'react';
import {
  View,
  Text,
  NetInfo,
  Dimensions,
  StyleSheet,
  Alert
} from 'react-native';

const { width } = Dimensions.get('window');

function Banner() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class Offline extends Component {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      Alert.alert(
        'Oops!',
        'The internet connection appears to be offline. Cannot get todo items.'
      );
      this.setState({ isConnected });
    }
  };

  render() {
    if (!this.state.isConnected) {
      return <Banner />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  offlineText: { color: '#fff' }
});

export default Offline;
