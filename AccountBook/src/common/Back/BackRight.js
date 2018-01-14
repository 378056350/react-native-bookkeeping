

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';

import Button from '../Button/Button';

const backIcon = require('../../assets/images/time_down.png');

class BackLeft extends Component {

  render() {
    return (
      <Button 
        style={styles.container} 
        customView={
          <View style={styles.back}>
            <Text style={styles.backText}>2017年</Text>
            <Image resizeMode={"contain"} style={styles.backIcon} source={backIcon} />
          </View>
        }
        onPress={this.props.onPress}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 40,
    justifyContent: 'center',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 15,
    height: 15,
  },
  backText: {
    marginLeft: 3,
    fontSize: 15, 
  }
});


// 连接组件 
export default BackLeft;