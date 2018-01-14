// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Cell extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{this.props.item.desc}</Text>
        <Text style={styles.desc}>{this.props.item.value}</Text>
        <View style={styles.line}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 10,
    color: 'rgba(100,100,100,1)',
    fontWeight: '300',
    fontSize: 12,
  },
  desc: {
    marginLeft: 15,
    color: '#282828',
    fontWeight: '300',
    fontSize: 12,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(244,244,244,1)',
    height: 0.5,
    width: ScreenWidth - 10
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
export default connect(mapStateToProps, mapDispatchToProps)(Cell);