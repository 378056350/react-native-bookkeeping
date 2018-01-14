

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

const backIcon = require('../../assets/images/nav_back_n.png');

class BackLeft extends Component {

  render() {
    return (
      <Button style={styles.container} 
              customView={
                <View style={styles.back}>
                  <Image resizeMode="contain" style={styles.backIcon} source={backIcon} />
                  <Text style={styles.backText}>返回</Text>
                </View>
              }
              onPress={() => {
                let {goBack} = this.props.navigation;
                goBack();
              }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 40,
    // marginLeft: 20,
    justifyContent: 'center',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,  
  },
  backText: {
    marginLeft: 3,
    fontSize: 13, 
  }
});


// 连接组件 
export default BackLeft;