import React, { Component } from 'react';
import { 
  View, 
  Text,
  Modal,
  TouchableHighlight,
  InteractionManager,
} from 'react-native';
import store from './redux/store/Store';
import { Provider } from 'react-redux';
import Tabbar from './component/tabbar/Tabbar';

import SplashScreen from 'react-native-splash-screen'


class App extends Component {

  componentDidMount() {
    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
          SplashScreen.hide();
      });
    }, 1000);
  }
  render() {
    return (
      <Provider store={store}>
        <Tabbar/>
      </Provider>
    );
  }
}

export default App;
