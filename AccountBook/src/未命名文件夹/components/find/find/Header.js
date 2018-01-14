// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view}/>
        <Text style={styles.text}>2017</Text>
        <View style={styles.line}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth, 
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  view: {
    width: 2,
    height: 13,
    backgroundColor: 'rgba(50,50,50,1)',
  },
  text: {
    color: 'rgba(50,50,50,1)',
    fontSize: 13,
    marginLeft: 5,
  },
  line: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    right: 10,
    height: 0.5,
    backgroundColor: 'rgba(244,244,244,1)',
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