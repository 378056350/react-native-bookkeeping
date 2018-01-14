// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated, Easing, SectionList, InteractionManager} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 数据库
import SaveCateManager from '../../../common/StorageManager/SaveCateManager';
// 截图
import { captureRef } from "react-native-view-shot";
// 控件
import Cell from './Cell';
import SectionHeader from './SectionHeader';
import TableNoData from './TableNoData';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moveY: new Animated.Value(this.props.moveY),
      text: [
              ["徽章"],
              ["类别设置","定时提醒","声音开关","明细详情"],
              ["类别设置","定时提醒","声音开关","明细详情"],
              ["类别设置","定时提醒","声音开关","明细详情"],
              ["升级至专业版","推荐鲨鱼记账给好友","去App Store给鲨鱼记账评分",
               "意见反馈","帮助","关于鲨鱼记账"]
            ],
      icon: [
            [require('../../../assets/images/mine_badge.png')],
            [
              require('../../../assets/images/mine_tallytype.png'),
              require('../../../assets/images/mine_remind.png'),
              require('../../../assets/images/mine_sound.png'),
              require('../../../assets/images/mine_detail.png')
            ],
            [
              require('../../../assets/images/mine_tallytype.png'),
              require('../../../assets/images/mine_remind.png'),
              require('../../../assets/images/mine_sound.png'),
              require('../../../assets/images/mine_detail.png')
            ],
            [
              require('../../../assets/images/mine_tallytype.png'),
              require('../../../assets/images/mine_remind.png'),
              require('../../../assets/images/mine_sound.png'),
              require('../../../assets/images/mine_detail.png')
            ],
            [require('../../../assets/images/mine_upgrade.png'),
             require('../../../assets/images/mine_share.png'),
             require('../../../assets/images/mine_rating.png'),
             require('../../../assets/images/mine_feedback.png'),
             require('../../../assets/images/mine_help.png'),
             require('../../../assets/images/mine_about.png')
            ]
          ],
    }
  }

  show(callBack) {
    var handle = InteractionManager.createInteractionHandle();
    Animated.timing(this.state.moveY,{ 
      duration: 1000,
      easing: Easing.elastic(0),
      toValue: 1
    }).start(()=>{
      if (callBack) {
        callBack();
      }
      InteractionManager.clearInteractionHandle(handle);
    });
  }
  hide(callBack) {
    var handle = InteractionManager.createInteractionHandle();
    Animated.timing(this.state.moveY,{ 
      duration: 1000,
      easing: Easing.elastic(0),
      toValue: 0
    }).start(()=>{
      if (callBack) {
        callBack();
      }
      InteractionManager.clearInteractionHandle(handle);
    });
  }

  _sections(){
    let arr = [];
    if (this.props.moveY == 0) {
      return arr;
    }
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
      <SectionHeader/>
    )
  }
  _cell(item) {
    return <Cell onPress={()=>this.props.onPress()}/>
  }
  _cellValueChange() {
    
  }


  render() {
    let isDown = this.props.tableMoveY == 0;
    var outputValue;
    if ((this.props.isShow == true && isDown == true) || 
        (this.props.isShow == false && isDown == false)) {
      outputValue = ScreenHeight - 50 - 64 - 54;
    } else {
      outputValue = -(ScreenHeight - 50 - 64 - 54);
    }
    return (
      <Animated.View style={[styles.container,{transform: [
        {
          translateY: this.state.moveY.interpolate({
                        inputRange: [0, 1],
                        outputRange: [outputValue, 0] 
                      })
        }
      ]}]}>
        <SectionList
          style={{flex: 1}}
          sections={this._sections()}
          renderSectionHeader={()=>this._renderSectionHeader()}
          showsVerticalScrollIndicator={false}
          onScroll={this.props.onScroll}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          ListEmptyComponent={<TableNoData/>}
          onScroll={this.props.onScroll}
          onTouchEnd={this.props.onTouchEnd}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 50 + 64,
    bottom: 0,
    backgroundColor: 'white',
  },
  sectionHeader: {
    width: ScreenWidth, 
    height: 10, 
    backgroundColor: 'white',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(244,244,244,1)',
    height: 0.5,
    width: ScreenWidth - 30
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
// export default connect(mapStateToProps, mapDispatchToProps)(Table);
export default Table;