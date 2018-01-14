// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, FlatList, ListView, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Line from '../../../common/Line/Line';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class SectionHeader extends Component {
  
  _onPress() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>更多类别</Text>
        <Line/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth, 
    paddingTop: 20, 
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  text: {
    color: '#282828',
    fontWeight: '300',
    fontSize: 12,
    marginLeft: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(SectionHeader);