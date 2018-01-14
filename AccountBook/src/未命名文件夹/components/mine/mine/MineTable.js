// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Header from './Header';
import MineCell from './MineCell';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class MineTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: [
              ["徽章"],
              ["类别设置","定时提醒","声音开关","明细详情"],
              ["升级至专业版","推荐鲨鱼记账给好友","去App Store给鲨鱼记账评分",
               "意见反馈","帮助","关于鲨鱼记账"]
            ],
      icon: [
            [require('../../../assets/images/mine_badge.png')],
            [require('../../../assets/images/mine_tallytype.png'),require('../../../assets/images/mine_remind.png'),
             require('../../../assets/images/mine_sound.png'),require('../../../assets/images/mine_detail.png')],
            [require('../../../assets/images/mine_upgrade.png'),
             require('../../../assets/images/mine_share.png'),require('../../../assets/images/mine_rating.png'),
             require('../../../assets/images/mine_feedback.png'),
             require('../../../assets/images/mine_help.png'),require('../../../assets/images/mine_about.png')]
          ],
    }
  }

  _ListHeaderComponent(){
    return (<Header/>)
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
            icon: this.state.icon[i][j],
            detail: i == 0 && j == 0 ? '已获得5枚' : ''
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
      <View style={styles.sectionHeader}/>
    )
  }
  _cell(item) {
    return <MineCell key={item.key} 
                     item={item} 
                     onValueChange={()=>this._cellValueChange()}
                     onClick={(item)=>this.props.onClick(item)}/>
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
          ListHeaderComponent={this._ListHeaderComponent()}
          sections={this._sections()}
          ItemSeparatorComponent={()=>this._itemSeparatorComponent()}
          renderSectionHeader={()=>this._renderSectionHeader()}
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
  nav: state.NavigationReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(MineTable);