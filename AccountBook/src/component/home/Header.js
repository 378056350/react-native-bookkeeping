// 控件
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// 控件
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Header extends Component {

  top() {
    let title = [this.props.year+"年", "收入", "支出"];
    let arr = [];
    for (let i=0; i<3; i++) {
      arr.push (
        <View key={i} style={{flex: i == 0 ? 3 : 4}}>
          <Text style={styles.text}>{title[i]}</Text>
        </View>
      )
    }
    return arr;
  }
  bottom() {
    let arr = [];
    for (let i=0; i<4; i++) {
      // 月份
      if (i == 0) {
        arr.push (
          <TouchableOpacity 
            key={i} 
            style={styles.one} 
            activeOpacity={0.8}
            onPress={this.props.onPress}
          >
            <View style={styles.oneV}>
              <Text style={styles.oneLeft}>{this.props.month}</Text>
              <Text style={styles.oneRight}>月</Text>
              <Image 
                resizeMode={"contain"} 
                style={styles.oneIcon} 
                source={require('../../assets/images/time_down.png')}
              />
            </View>
          </TouchableOpacity>
        )
      } 
      // 线
      else if (i == 1) {
        arr.push (
          <View key={i} style={styles.line}/>
        )
      } 
      // 收入/支出
      else {
        let inEx = i == 2 ? this.props.ex : this.props.in;
        arr.push (
          <View key={i} style={styles.two}>
            <Text style={styles.twoText}>{inEx}</Text>
          </View>
        )
      }
    } 
    return arr;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {this.top()}
        </View>
        <View style={styles.bottom}>
          {this.bottom()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: StreamColor,
    flexDirection: 'column',
    height: 50,
  },
  // 顶部
  top: {
    width: ScreenWidth,
    flexDirection: 'row',
  },
  text: {
    fontWeight: '300',
    fontSize: 11,
    color: '#282828',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center'
  },
  // 底部
  bottom: {
    width: ScreenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  one: {
    flex: 3, 
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  oneV: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  oneLeft: {
    fontSize: 18,
    color: '#282828',
    fontWeight: '300',
  },
  oneRight: {
    fontSize: 9,
    color: '#282828',
    fontWeight: '300',
    marginBottom: 3,
    marginLeft: 2,
  },
  oneIcon: {
    width: 12,
    height: 12,
    marginLeft: 2,
    marginBottom: 2,
  },
  two: {
    flex: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  twoText: {
    fontWeight: '300',
    fontSize: 16,
    color: '#282828',
    textAlign: 'center',
  },
  line: {
    width: 0.5,
    height: 15,
    backgroundColor: 'gray',
  }
});

Header.defaultProps = {
  year: 0,
  month: 0,
  onPress: ()=>{}
}
Header.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  onPress: PropTypes.func,
}


// 连接组件
export default Header;