// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {

  top() {
    let title = ["2017年","收入","支出"];
    let arr = [];
    for (let i=0; i<3; i++) {
      arr.push (
        <View key={i} style={{flex: i == 0 ? 3 : 4, marginLeft: 20}}>
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
              <Text style={styles.oneLeft}>11</Text>
              <Text style={styles.oneRight}>月</Text>
              <Image resizeMode={"contain"} style={styles.oneIcon} source={require('../../../assets/images/time_down.png')}/>
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
        arr.push (
          <View key={i} style={styles.two}>
            <Text style={styles.twoText}>0.00</Text>
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
  },
  // 顶部
  top: {
    width: ScreenWidth,
    flexDirection: 'row',
  },
  text: {
    fontWeight: '300',
    fontSize: 9,
    color: '#282828',
    paddingTop: 5,
    paddingBottom: 5,
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
    alignItems: 'flex-end'
  },
  oneV: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    marginLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  twoText: {
    fontWeight: '300',
    fontSize: 16,
    color: '#282828'
  },
  line: {
    width: 0.5,
    height: 15,
    backgroundColor: 'gray',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  nav: state.NavigationReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Header);