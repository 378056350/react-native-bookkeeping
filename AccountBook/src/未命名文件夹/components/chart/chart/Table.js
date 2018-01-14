// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import TableHeader from './TableHeader';
import Cell from './Cell';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Table extends Component {

  render() {
    const { ChartReducer, MainReducer } = this.props;
    return (
      <FlatList
        style={styles.container}
        ListHeaderComponent={<TableHeader/>}
        data={MainReducer.currentData.data}
        renderItem={({item}) => <Cell item={item}/>}
        scrollEnabled={ChartReducer.isShowChartHud == false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  ChartReducer: state.ChartReducer,
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Table);