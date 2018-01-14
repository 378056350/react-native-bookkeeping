// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';

class ScrollHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left: new Animated.Value(0),
      width: new Animated.Value(80),
      currentSelect: 0
    }
  }
  componentDidMount() {
    this.onClick(this.props.range.length-1);
    let scroll =  this.props.range.length * 80 - ScreenWidth;
    if (scroll > 0) {
      this.refs.scroll.scrollTo({x: this.props.range.length * 80 - ScreenWidth, y: 0, animated: false});
    }
  }
  show=(i, width)=>{
    Animated.parallel([   
      Animated.timing(this.state.left,{ 
        duration: 300,
        easing: Easing.elastic(0),
        toValue: i * 80 + (80 - width) / 2
      }),
      Animated.timing(this.state.width,{ 
        duration: 300,
        easing: Easing.elastic(0),
        toValue: width
      })
    ]).start()
  }
  text() {
    let arr = [];
    for (let i=0; i<this.props.range.length; i++) {
      arr.push(
        <TouchableOpacity 
          key={i} 
          style={{width: 80}} 
          activeOpacity={0.8} 
          onPress={()=>this.onClick(i)}
        >
          <View style={styles.button}>
            <Text style={[
              styles.name, 
              i == this.state.currentSelect ? styles.select : styles.asd
            ]}>{this.props.range[i].remark}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return arr;
  }
  line() {
    return (
      <Animated.View style={[styles.line,{
        transform: [{
          translateX: this.state.left
        }],
        width: this.state.width
      }]}/>
    )
  }
  onMove(i) {
    var count = this.props.range.length;
    var title = i == 1 ? '2016年' : (i == 2) ? '01周' : '上周';
    var width = 0;
    if (title.length <= 2) {
      width = 40;
    } else if (title.length == 3) {
      width = 60;
    } else {
      width = 80;
    }
    // 两端
    if (i <= 1 || i >= count - 2) {
      // 左侧
      if (i <= 1) {
        this.refs.scroll.scrollTo({x: 0, y: 0, animated: true});
      } 
      // 右侧
      else {
        this.refs.scroll.scrollToEnd({animated: true});
      }
    } 
    // 中间
    else {
      this.refs.scroll.scrollTo({x: (i + 1) * 80 - ScreenWidth / 2 - 40, y: 0, animated: true});
    }
    // 选中文本
    this.setState({
      currentSelect: i,
    })
    // 线条
    this.show(i, width);
  }
  onClick(i) {
    this.onMove(i);
    this.props.onPress(i);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          ref={'scroll'}
        >
          {this.text()}
          {this.line()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 35,
    backgroundColor: 'white',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  button: {
    justifyContent: 'center', 
    alignItems: 'center',
    height: 35,
    width: 80,
  },
  name: {
    color: '#aaa',
    fontSize: 11,
    fontWeight: '300',
    textAlign: 'center',
  },
  select: {
    fontSize: 13,
    color: TitleColor,
  },
  line: {
    width: 74,
    height: 2,
    backgroundColor: TitleColor,
    position: 'absolute',
    left: 0,
    bottom: 0,
  }
});

ScrollHeader.defaultProps = {
  onPress: ()=>{},
  range: [],
}
ScrollHeader.propTypes = {
  onPress: PropTypes.func.isRequired,
  range: PropTypes.array,
}

export default ScrollHeader;