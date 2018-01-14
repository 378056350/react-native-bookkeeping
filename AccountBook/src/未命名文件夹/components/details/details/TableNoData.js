// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated, Easing, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 数据库
import SaveCateManager from '../../../common/StorageManager/SaveCateManager';
// 截图
import { captureRef } from "react-native-view-shot";
// 控件
import Cell from './Cell';
import SectionHeader from './SectionHeader';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class TableNoData extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>asdasdd</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight - 64 - 50 - 54,
    backgroundColor: 'red',
  },
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
// export default connect(mapStateToProps, mapDispatchToProps)(Table);
export default TableNoData;