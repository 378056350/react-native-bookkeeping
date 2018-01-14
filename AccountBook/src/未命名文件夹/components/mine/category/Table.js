// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 数据库
import SaveCateManager from '../../../common/StorageManager/SaveCateManager';
// 控件
import Cell from './Cell';
import SectionHeader from './SectionHeader';
import Line from '../../../common/Line/Line';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: [],
    }
  }

  _sections() {
    const { MainReducer } = this.props;
    let arr = [];
    let data = [MainReducer.currentCateData, MainReducer.deleteCateData];
    for (let i=0; i<data.length; i++) {
      let subarr = [];
      for(let j=0; j<data[i].length; j++) {
        subarr.push (
          {
            key: j, 
            section: i,
            row: j,
            text: data[i][j].name,
            icon: data[i][j].icon,
          }
        )
      }
      arr.push({data: subarr, key: i, renderItem: ({item}) => this._cell(item)});
    }
    return arr;
  }
  _itemSeparatorComponent() {
    return (
      <Line left={10}/>
    )
  }
  _renderSectionHeader(info) {
    const { MainReducer } = this.props;
    if (MainReducer.deleteCateData.length != 0) {
      return (
        <SectionHeader title={"更多类别"}/>
      )
    } else {
      return (
        <View style={{width: 5, height: 10}}/>
      )
    }
  }
  _renderSectionFooter(info) {
    return (
      <View style={{width: 5, height: 10}}/>
    )
  }
  _cell(item) {
    return <Cell item={item}/>
  }
  _cellValueChange() {
    
  }
  _ListFooterComponent() {
    return (
      <View style={styles.tableFooter}/>
    )
  }

  render() {
    return (
      <SectionList
          style={styles.container}
          sections={this._sections()}
          ItemSeparatorComponent={()=>this._itemSeparatorComponent()}
          renderSectionHeader={(info)=>this._renderSectionHeader(info)}
          renderSectionFooter={(info)=>this._renderSectionFooter(info)}
          ListFooterComponent={()=>this._ListFooterComponent()}
          showsVerticalScrollIndicator={false}
          onScroll={this.props.onScroll}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 45,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    width: ScreenWidth, 
    height: 10, 
    backgroundColor: 'rgba(244,244,244,1)',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(244,244,244,1)',
    height: 1,
    width: ScreenWidth - 50
  },
  tableFooter: {
    width: ScreenWidth, 
    height: 40, 
    backgroundColor: 'rgba(244,244,244,1)',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MineReducer: state.MineReducer,
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Table);