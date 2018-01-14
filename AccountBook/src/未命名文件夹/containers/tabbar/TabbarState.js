// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
// 控件
import Tabbar from './Tabbar';

class TabbarState extends Component {
  render() {
    return (
      <Tabbar
          navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.nav
          })}
      />
    );
  }
}

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  nav: state.NavigationReducer
});

// 连接组件
export default connect(mapStateToProps)(TabbarState);