// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Cell from './Cell';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Table extends Component {

  cell(item) {
    return (
      <Cell item={item}/>
    )
  }

  render() {
    return (
      <FlatList
        style={[this.props.style,styles.container]}
        data={[{key: 'a', desc: '类型', value: '支出'},
               {key: 'b', desc: '金额', value: '-1267.00'}, 
               {key: 'c', desc: '日期', value: '2017年4月17日 星期四'}, 
               {key: 'd', desc: '备注', value: '这个是备注信息'}]}
        renderItem={({item}) => this.cell(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
export default connect(mapStateToProps, mapDispatchToProps)(Table);