// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Punch from './Punch';
import HeaderIcon from './HeaderIcon';
import HeaderText from './HeaderText';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Punch/>
        <HeaderIcon/>
        <HeaderText/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 190,
    backgroundColor: StreamColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
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