// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {

  money() {
    let arr = [];
    for (let i=0; i<3; i++) {
      if (i != 1) {
        arr.push (
          <View key={i} style={styles.subView}>
            <Text style={styles.desc}>收入</Text>
            <Text style={styles.money}>2369.00</Text>
          </View>
        )
      } else {
        arr.push (
          <View key={i} style={styles.line}/>
        )
      }
    } 
    return arr;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topName}>结余</Text>
        <Text style={styles.topDesc}>-2369.00</Text>
        <View style={styles.view}>
          {this.money()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth, 
    backgroundColor: StreamColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flexDirection: 'row',
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topName: {
    color: '#282828',
    fontSize: 10,
    fontWeight: '300',
    marginTop: 10,
    marginBottom: 10,
  },
  topDesc: {
    color: '#282828',
    fontSize: 24,
    fontWeight: '300',
  },
  // 收入/支出
  subView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  desc: {
    color: '#282828',
    fontSize: 9,
    fontWeight: '300',
    paddingBottom: 2,
  },
  money: {
    color: '#282828',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 3,
  },
  line: {
    width: 0.5,
    height: 15,
    backgroundColor: '#282828'
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Header);