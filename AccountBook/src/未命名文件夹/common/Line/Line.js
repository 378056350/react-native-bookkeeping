

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';

import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Line extends Component {

  render() {
    return (
      <View style={[styles.line, {
        left: this.props.left ? this.props.left : 0, 
        right: this.props.right ? this.props.right : 0,
      }]}/>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(233,233,233,1)',
    height: 0.5,
  }
});


// 连接组件 
export default Line;