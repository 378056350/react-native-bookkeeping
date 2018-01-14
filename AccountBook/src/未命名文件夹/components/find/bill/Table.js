// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Cell from './Cell';
import Header from './Header';
import SectionHeader from './SectionHeader';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Table extends Component {

  _sections(){
    let arr = [];
    for (let i=0;i<1; i++) {
      let subarr = [];
      for(let j=0;j<12; j++) {
        subarr.push (
          {
            key: j, 
            section: i,
            row: j,
            text: "adas", 
          }
        )
      }
      arr.push({data: subarr, renderItem: ({item}) => this._cell(item)});
    }
    return arr;
  }
  _cell(item) {
    return <Cell />
  }
  _renderSectionHeader() {
    return (
      <SectionHeader/>
    )
  }

  _ListHeaderComponent() {
    return (
      <Header/>
    )
  }
  _itemSeparatorComponent() {
    return (
      <View style={styles.line}/>
    )
  }

  render() {
    return (
      <SectionList
          style={styles.container}
          renderItem={(data)=>this._renderItem(data)}
          ListHeaderComponent={()=>this._ListHeaderComponent()}
          renderSectionHeader={()=>this._renderSectionHeader()}
          ItemSeparatorComponent={()=>this._itemSeparatorComponent()}
          sections={this._sections()}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(233,233,233,1)',
    height: 0.5,
    width: ScreenWidth
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