// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import BadgeCell from './BadgeCell';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class BadgeTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: [
         ["新手入门","连续3天徽章","连续7天徽章","连续21天徽章","连续50天徽章",
          "连续100天徽章","连续200天徽章","连续365天徽章","连续500天徽章"],
         ["累计记账30天","累计记账100天","累计记账365天",
          "累计记账500天","累计记账800天","累计记账1000天"],
         ["累计记账99笔","累计记账333笔","累计记账555笔",
          "累计记账888笔","累计记账1024笔","累计记账2046笔"],
         ["馋虫","吃货","贪吃鬼","吃霸","饕鬄"],
         ["萌芽","买买买","购物狂","剁手党","维多利亚"],
         ["宅人漫步","惬意闲人","玩乐高手","环游世界","游戏人间"],
         ["搬砖的","卖瓜的","小地主","小老板","土豪爸爸"]
            ],
      icon: [
        [
          require('../../../assets/images/1.png'),
          require('../../../assets/images/2.png'),
          require('../../../assets/images/3.png'),
          require('../../../assets/images/4.png'),
          require('../../../assets/images/5.png'),
          require('../../../assets/images/6.png'),
          require('../../../assets/images/7.png'),
          require('../../../assets/images/8.png'),
          require('../../../assets/images/9.png')
        ],
        [
          require('../../../assets/images/10.png'),
          require('../../../assets/images/11.png'),
          require('../../../assets/images/12.png'),
          require('../../../assets/images/13.png'),
          require('../../../assets/images/14.png'),
          require('../../../assets/images/15.png')
        ],
        [
          require('../../../assets/images/16.png'),
          require('../../../assets/images/17.png'),
          require('../../../assets/images/18.png'),
          require('../../../assets/images/19.png'),
          require('../../../assets/images/20.png'),
          require('../../../assets/images/21.png')
        ],
        [
          require('../../../assets/images/22.png'),
          require('../../../assets/images/23.png'),
          require('../../../assets/images/24.png'),
          require('../../../assets/images/25.png'),
          require('../../../assets/images/26.png'),
        ],
        [
          require('../../../assets/images/27.png'),
          require('../../../assets/images/28.png'),
          require('../../../assets/images/29.png'),
          require('../../../assets/images/30.png'),
          require('../../../assets/images/31.png')
        ],
        [
          require('../../../assets/images/32.png'),
          require('../../../assets/images/33.png'),
          require('../../../assets/images/34.png'),
          require('../../../assets/images/35.png'),
          require('../../../assets/images/36.png')
        ],
        [
          require('../../../assets/images/37.png'),
          require('../../../assets/images/38.png'),
          require('../../../assets/images/39.png'),
          require('../../../assets/images/40.png'),
          require('../../../assets/images/41.png')
        ],
      ]
    }
  }

  _sections(){
    let arr = [];
    for (let i=0; i<this.state.text.length; i++) {
      let subarr = [];
      for(let j=0; j<this.state.text[i].length; j++) {
        subarr.push ({
            key: j, 
            section: i,
            row: j,
            text: this.state.text[i][j], 
            icon: this.state.icon[i][j], 
        })
      }
      arr.push({data: [{key: i, data: subarr}], renderItem: ({item}) => this._cell(item)});
    }
    return arr;
  }
  _renderSectionHeader() {
    return (
      <View style={styles.sectionHeader}/>
    )
  }
  _renderSectionHeader() {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>连续打卡</Text>
        <Text style={styles.sectionHeaderDesc}>已获取1枚</Text>
      </View>
    )
  }
  _renderSectionFooter(item) {
    return (
      <View style={[styles.sectionFooter,{
        backgroundColor: item.section.data[0].key != this.state.text.length - 1 ? 'rgba(233,233,233,1)' : 'rgba(244,244,244,1)'
      }]}/>
    )
  }
  _cell(item) {
    return <BadgeCell key={item.key} 
                      item={item}
                      onPress={(item)=>this.props.onPress(item)}/>
  }
  
  render() {
    return (
      <SectionList
          style={[this.props.data_style]}
          sections={this._sections()}
          renderSectionHeader={()=>this._renderSectionHeader()}
          renderSectionFooter={(item)=>this._renderSectionFooter(item)}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: ScreenWidth,
    height: ScreenHeight - 64,
    // backgroundColor: 'red',
  },
  sectionHeader: {
    width: ScreenWidth, 
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'rgba(244,244,244,1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: 11,
    fontWeight: '300',
    color: 'rgba(50,50,50,1)',
  },
  sectionHeaderDesc: {
    fontSize: 9,
    fontWeight: '300',
    color: 'rgba(100,100,100,1)',
    marginLeft: 7,
  },
  sectionFooter: {
    width: ScreenWidth, 
    height: 15,
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
export default connect(mapStateToProps, mapDispatchToProps)(BadgeTable);