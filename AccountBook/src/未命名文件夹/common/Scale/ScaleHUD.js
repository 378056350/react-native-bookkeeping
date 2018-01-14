

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  PanResponder
} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import ScaleHUDText from './ScaleHUDText';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class ScaleHUD extends Component {

  view() {
    if (false) {
      return (
        <Text style={styles.text}>没有费用</Text>
      )
    } else {
      let arr = [];
      arr.push (
        <View key={0} style={styles.billView}>
          <Text style={styles.billText}>前3笔交易</Text>
        </View>
      )
      arr.push(
        <ScaleHUDText key={1}/>
      )
      arr.push(
        <ScaleHUDText key={2}/>
      )
      arr.push(
        <ScaleHUDText key={3}/>
      )
      return arr
    }
  }

  leftTop() {
    const { ChartReducer } = this.props;
    let hudW = ScreenWidth / 7 * 4;
    let left = ChartReducer.chartHudLeft - hudW / 2;
    if ((left + hudW) > ScreenWidth) {
      left = ScreenWidth - hudW;
    } else if (left < 0) {
      left = 0;
    }
    return left;
  }

  leftIcon() {
    const { ChartReducer } = this.props;
    let hudW = ScreenWidth / 7 * 4;
    let left = ChartReducer.chartHudLeft - hudW / 2;
    if ((left + hudW) > ScreenWidth) {
      left = ChartReducer.chartHudLeft - (ScreenWidth - hudW) - 7.5;
    } else if (left < 0) {
      left = ChartReducer.chartHudLeft - 7.5;
    } else {
      left = hudW / 2 - 7.5;
    }
    return left;
  }

  leftLine() {
    const { ChartReducer } = this.props;
    let hudW = ScreenWidth / 7 * 4;
    let left = ChartReducer.chartHudLeft - hudW / 2;
    if ((left + hudW) > ScreenWidth) {
      left = ChartReducer.chartHudLeft - (ScreenWidth - hudW) - 0.5;
    } else if (left < 0) {
      left = ChartReducer.chartHudLeft - 0.5;
    } else {
      left = hudW / 2 - 0.5;
    }
    return left;
  }

  render() {
    const { ChartReducer } = this.props;
    return (
      <View style={[styles.container, {
        left: this.leftTop(),
        top: ChartReducer.chartHudTop,
        display: ChartReducer.isShowChartHud == true ? 'flex' : 'none'
      }]} pointerEvents={'none'}>
        <View style={styles.view}>
          {this.view()}
        </View>
        <Image 
          style={[styles.triangle,{
            marginLeft: this.leftIcon()
          }]} 
          resizeMode={"contain"} 
          source={require('../../assets/images/time_down.png')}
        />
        <View style={[styles.line,{
          marginLeft: this.leftLine()
        }]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  view: {
    width: ScreenWidth / 7 * 4,
    backgroundColor: '#282828',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  triangle: {
    width: 15,
    height: 15,
    marginTop: -7,
    marginLeft: 10,
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: '#282828',
    marginLeft: 16.8,
    marginTop: -7,
  },
  // 没有费用
  text: {
    color: 'white',
    fontWeight: '300',
    fontSize: 13,
    paddingTop: 30,
    paddingBottom: 30,
  },
  // 前3笔交易
  billView: {
    width: ScreenWidth / 7 * 4 - 15,
    backgroundColor: '#3e3e3e',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  billText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '300',
  }
});


// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  ChartReducer: state.ChartReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(ScaleHUD);