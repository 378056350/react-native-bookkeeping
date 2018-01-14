

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  PanResponder
} from 'react-native';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class ScaleHUDText extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon}/>
        <Text style={styles.text}>17/02/02</Text>
        <Text style={styles.text}>娱乐</Text>
        <Text style={styles.text}>699</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: ScreenWidth / 7 * 4 - 15,
  },
  icon: {
    width: 13,
    height: 13,
    backgroundColor: 'red',
  },
  text: {
    fontWeight: '300',
    color: 'white',
    fontSize: 10,
  }
  
});


// 连接组件 
export default ScaleHUDText;