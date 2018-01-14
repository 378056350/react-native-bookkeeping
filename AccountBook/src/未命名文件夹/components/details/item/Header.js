// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.bottom}/>
        <View style={styles.top}>
          <Image style={styles.icon}/>
          <Text style={styles.text}>居家</Text> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth / 2,
    height: 120,
    position: 'absolute',
    top: 30,
    left: ScreenWidth / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    width: ScreenWidth / 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  bottom: {
    width: ScreenWidth,
    height: 55,
    backgroundColor: StreamColor,
  },
  icon: {
    width: ScreenWidth / 6,
    height: ScreenWidth / 6,
    backgroundColor: 'white',
    borderRadius: ScreenWidth / 6 / 2,
  },
  text: {
    marginTop: 10,
    color: '#282828',
    fontSize: 12,
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);