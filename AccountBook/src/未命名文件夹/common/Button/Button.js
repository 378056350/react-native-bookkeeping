

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

class Button extends Component {

  render() {
    return (
      <TouchableOpacity style={this.props.style} activeOpacity={0.6} onPress={()=>{
          if (this.props.onPress != undefined) {
            this.props.onPress();
          }
      }}>
        {this.props.customView}
      </TouchableOpacity>
    );
  }
}


// 连接组件 
export default Button;