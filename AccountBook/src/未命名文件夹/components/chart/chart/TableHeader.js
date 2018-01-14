// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Scale from '../../../common/Scale/Scale';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class TableHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.totalMoney}>总支出: 7847.00</Text>
        <Text style={styles.avgMoney}>平均值: 1121.00</Text>
        <Scale/>
        <Text style={styles.avgMoney}>支出排行榜</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  totalMoney: {
    fontWeight: '300',
    color: 'rgba(100,100,100,1)',
    fontSize: 11,
  },
  avgMoney: {
    fontWeight: '300',
    color: 'rgba(100,100,100,1)',
    fontSize: 10,
    paddingTop: 3,
    paddingBottom: 5,
  },
  desc: {
    fontWeight: '300',
    color: 'rgba(100,100,100,1)',
    fontSize: 10,
    paddingTop: 3,
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
export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);