// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Header from './Header';
import Cell from './Cell';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: [
              ["徽章"],
              ["类别设置","定时提醒","声音开关","明细详情"],
              ["升级至专业版","推荐鲨鱼记账给好友","去App Store给鲨鱼记账评分","帮助","关于鲨鱼记账"]
            ],
    }
  }

  _sections(){
    let arr = [];
    for (let i=0;i<this.state.text.length; i++) {
      let subarr = [];
      for(let j=0;j<this.state.text[i].length; j++) {
        subarr.push (
          {
            key: j, 
            section: i,
            row: j,
            text: this.state.text[i][j], 
          }
        )
      }
      arr.push({data: subarr, renderItem: ({item}) => this._cell(item)});
    }
    return arr;
  }
  _itemSeparatorComponent() {
    return (
      <View style={styles.line}/>
    )
  }
  _renderSectionHeader() {
    return (
      <Header/>
    )
  }
  _renderSectionFooter() {
    return (
      <View style={styles.sectionFooter}/>
    )
  }
  _cell(item) {
    return <Cell item={item}
                 onPress={(item)=>this.props.onPress(item)}
           />
  }
  _cellValueChange() {
    
  }

  render() {
    return (
      <SectionList
          style={styles.container}
          sections={this._sections()}
          ItemSeparatorComponent={()=>this._itemSeparatorComponent()}
          renderSectionHeader={()=>this._renderSectionHeader()}
          renderSectionFooter={()=>this._renderSectionFooter()}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
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
  sectionFooter: {
    width: ScreenWidth, 
    height: 10, 
    backgroundColor: 'transparent',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 10,
    backgroundColor: 'rgba(244,244,244,1)',
    height: 0.5,
    width: ScreenWidth - 20
  },
  tableFooter: {
    width: ScreenWidth, 
    height: 40, 
    backgroundColor: 'rgba(244,244,244,1)',
  }
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