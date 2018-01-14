

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';

import { ScreenWidth, BackDefaultColor } from '../../utils/index';

class Line extends Component {

  render() {
    return (
      <View style={[styles.line, {
        left: this.props.left, 
        right: this.props.right,
        backgroundColor: this.props.color,
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

Line.defaultProps = {
  left: 0,
  right: 0,
  color: BackDefaultColor
}

Line.propTypes = {
  left: PropTypes.number,
  right:  PropTypes.number,
  color: PropTypes.string,
}


// 连接组件 
export default Line;