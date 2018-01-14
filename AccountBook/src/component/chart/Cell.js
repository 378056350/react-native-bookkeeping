// 控件
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
// 控件
import { ICON_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';

class Cell extends Component {

  render() {
    return (
      <TouchableHighlight underlayColor={"rgba(244,244,244,1)"} onPress={this.props.onPress}>
        <View style={styles.container}>
          {/* 图片 */}
          <Image style={styles.icon} source={ICON_JSON[this.props.item.row].iconL}/>
          {/* 右侧 */}
          <View style={styles.right}>
            {/* 顶部 */}
            <View style={styles.top}>
              <Text style={styles.name}>{this.props.item.name}</Text>
              <Text style={styles.percent}>{this.props.item.percent * 100 + "%"}</Text>
              <Text style={styles.number}>{this.props.item.money}</Text>
            </View>
            {/* 底部 */}
            <View style={styles.bottom}>
              <View style={styles.progess}/>
            </View>
          </View>
          {/* 线条 */}
          <View style={styles.line}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: 'white',
    height: 50, 
    alignItems: 'center',
    flexDirection: 'row',
  },
  // 图片
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  // 右侧
  right: {
    flexDirection: 'column',
    height: 30,
    flex: 1,
    marginLeft: 10,
  },
  // 顶部
  top: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  name: {
    fontWeight: '300',
    color: '#282828',
    fontSize: 11,
  },
  percent: {
    fontWeight: '300',
    color: '#282828',
    fontSize: 10,
    flex: 1,
    marginLeft: 5,
  },
  number: {
    fontWeight: '300',
    color: '#282828',
    fontSize: 11,
    marginRight: 10,
  },
  // 底部
  bottom: {
    flex: 1,
  },
  progess: {
    backgroundColor: StreamColor,
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  // 线
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(244,244,244,1)',
    height: 0.5,
    width: ScreenWidth - 45
  },
});

Cell.defaultProps = {
  item: {
    name: '',
    percent: 1,
    money: '0',
  },
  onPress: ()=>{}
}
Cell.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    percent:  PropTypes.number,
    money:  PropTypes.string,
  }),
  onPress: PropTypes.func,
}

// 连接组件
export default Cell;