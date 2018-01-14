

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class InEx extends Component {

  render() {
    let text = ['支出', '收入'][this.props.text]
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.name}>{text}</Text>
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
  },
  name: {
    fontSize: 16,
    color: TitleColor,
    fontWeight: '400',
  },
  icon: {
    width: 15,
    height: 15,
  }
});

InEx.defaultProps = {
  onPress: ()=>{},
}

InEx.propTypes = {
  onPress: PropTypes.func.isRequired,
}

// 连接组件 
export default InEx;
