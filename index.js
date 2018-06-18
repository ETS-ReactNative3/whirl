import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));
// Amplify
import config from './src/aws-exports';
import Amplify from 'aws-amplify';

// hide isMounted() warnings due to them being in node_modules
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNFetchBlob'
]);

Amplify.configure(config);
// App
const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent('Whirl', () => ReduxApp);
