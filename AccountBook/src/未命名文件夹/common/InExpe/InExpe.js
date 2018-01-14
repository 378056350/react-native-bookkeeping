

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {ScreenWidth, ScreenHeight, StreamColor, NavigationTitle} from '../../public/Public';

class InExpe extends Component {
  

  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text>{this.props.title}</Text>
          <Image style={styles.icon} source={require('../../assets/images/time_down.png')}/>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: ScreenWidth,
  },
  text: {
    fontSize: 16
  },
  icon: {
    width: 15,
    height: 15,
  }
});


// 连接组件 
export default InExpe;