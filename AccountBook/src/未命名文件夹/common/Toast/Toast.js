

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native';
import { ScreenHeight } from '../../public/Public';

// 时间
export const DURATION = {
  LENGTH_SHORT: 500,  // 短
  LENGTH_LONG: 2000,  // 长
  FOREVER: 0,         // 永久
};

// 位置
export const POSITION = {
  TOP: 2000,        // 上
  CENTER: 500,      // 中
  BOTTOM: 0,        // 下
};

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacityValue: new Animated.Value(0),
      isShow: false
    }
  }

  show() {
    if (this.state.isShow == false) {
      this.state.isShow = true;
      Animated.timing(this.state.opacityValue, {
        fromValue: 0,
        toValue: 1,
        duration: 300,
      }).start(() => {
        if (this.props.duration != DURATION.FOREVER) {
          if (this.state.isShow == true) {
            this.timer = setTimeout(()=>{
              this.close();
            },this.props.duration)
          }
        }
      });
    }
  }
  close() {
    this.timer && clearTimeout(this.timer);
    if (this.state.isShow == true) {
      this.state.isShow = false;
      Animated.timing(this.state.opacityValue, {
        fromValue: 1,
        toValue: 0,
        duration: 200,
      }).start(() => {
      });
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    var top;
    if (this.props.position == POSITION.TOP) {
      top = 40;
    } else if (this.props.position == POSITION.CENTER) {
      top = this.props.toastH / 2;
    } else if (this.props.position == POSITION.BOTTOM) {
      top = this.props.toastH - 80;
    }

    return (
      <Animated.View style={[styles.container,{top: top, opacity: this.state.opacityValue, backgroundColor: this.props.color == undefined ? '#777' : this.props.color}]}>
        <Text style={styles.text} numberOfLines={1}>asd</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 4,
    borderColor: 'red',
    backgroundColor: '#777',
    marginLeft: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 5,
  },
  text: {
    color: 'white',
    paddingBottom: 5,
  }
});


// 连接组件 
export default Toast;