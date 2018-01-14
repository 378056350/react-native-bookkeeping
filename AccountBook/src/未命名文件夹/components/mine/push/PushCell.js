// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class PushCell extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>提醒时间</Text>
        <Text style={styles.desc}>每天 16:07</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 45,
    backgroundColor: 'rgba(244,244,244,1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    marginLeft: 10,
    fontSize: 12,
    color: 'rgba(50,50,50,1)',
    fontWeight: '300',
  },
  desc: {
    marginRight: 10,
    fontSize: 11,
    color: 'rgba(75,75,75,1)',
    fontWeight: '300',
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
// export default connect(mapStateToProps, mapDispatchToProps)(PushCell);

export default PushCell;