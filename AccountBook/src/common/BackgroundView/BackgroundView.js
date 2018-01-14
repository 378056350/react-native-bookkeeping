

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class BackgroundView extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.top}/>
        <View style={[styles.bottom, {
          backgroundColor: this.props.bottomColor == undefined ? 'white' : this.props.bottomColor
        }]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ScreenWidth,
    height: ScreenHeight
  },
  top: {
    width: ScreenWidth,
    height: ScreenHeight / 2,
    backgroundColor: StreamColor,
  },
  bottom: {
    width: ScreenWidth,
    height: ScreenHeight / 2,
  }
});


// 连接组件 
export default BackgroundView;