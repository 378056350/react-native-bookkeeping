// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class SectionHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.left}>11月30日</Text>
        <Text style={styles.center}>星期四</Text>
        <Text style={styles.right}>支出: 1573</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: 'white',
    borderBottomColor: 'rgba(233,233,233,1)',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    fontSize: 9,
    color: 'rgba(100,100,100,1)',
    fontWeight: '300',
    paddingLeft: 10,
  },
  center: {
    fontSize: 9,
    color: 'rgba(100,100,100,1)',
    fontWeight: '300',
    flex: 1,
    paddingLeft: 5,
  },
  right: {
    fontSize: 9,
    color: 'rgba(100,100,100,1)',
    fontWeight: '300',
    marginRight: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(SectionHeader);