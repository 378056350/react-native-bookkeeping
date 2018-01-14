

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

class AddButton extends Component {

  render() {
    return (
      <TouchableHighlight style={styles.add} activeOpacity={1} underlayColor="rgba(250,250,250,1)" onPress={this.props.onPress}>
        <View>
          <Text style={styles.addText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  add: {
    width: ScreenWidth,
    height: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(222,222,222,1)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 20,
  },
  addText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'rgba(50,50,50,1)',
  }
});


// 连接组件 
export default AddButton;