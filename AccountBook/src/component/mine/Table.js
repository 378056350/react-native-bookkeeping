// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, SectionList } from 'react-native';
// Utils
import Header from './Header';
import Cell from './Cell';
import { BackgroundView, Line } from '../../common/index';
import { 
  ScreenWidth, 
  ScreenHeight, 
  StreamColor, 
  TitleColor, 
  BackDefaultColor,
} from '../../utils/index';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  data=()=>{
    let data = this.props.data;
    let arr = [];
    for (let x=0; x<data.length; x++) {
      let subarr = [];
      for (let y=0; y<data[x].length; y++) {
        subarr.push ({
          name: data[x][y].name, 
          icon: data[x][y].icon,
          key: y, 
          row: y, 
          section: x, 
          isSwitch: (x == 1 && ( y == 2 || y == 3))
        })
      }
      arr.push({
        data: subarr, 
        title: '标题'
      });
    }
    return arr;
  }
  _ListHeaderComponent=()=>{
    return (
      <Header 
        onClickBadge={this.props.onClickBadge}
      />
    )
  }
  _ListFooterComponent=()=>{
    return (
      <View style={styles.footer}/>
    )
  }
  _renderSectionHeader=()=>{
    return (
      <View style={styles.sectionHeader}/>
    )
  }
  _ItemSeparatorComponent=()=>{
    return (
      <Line left={35}/>
    )
  }
  _renderItem=(item)=>{
    return (
      <Cell 
        item={item} 
        onPress={()=>this.props.onPress(item)}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <BackgroundView style={styles.back} bottomColor={BackDefaultColor}/>
        <SectionList
          ListHeaderComponent={this._ListHeaderComponent()}
          ListFooterComponent={this._ListFooterComponent()}
          renderSectionHeader={({section}) => this._renderSectionHeader()}
          ItemSeparatorComponent={()=>this._ItemSeparatorComponent()}
          renderItem={({item}) => this._renderItem(item)}
          sections={this.data()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          onScroll={this.props.onScroll}
          getItemLayout={(data, index) => ({
            length: 40, 
            offset: 40 * index, 
            index: index,
          })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackDefaultColor,
  },
  sectionHeader: {
    width: ScreenWidth,
    height: 10,
    backgroundColor: BackDefaultColor,
  },
  footer: {
    width: ScreenWidth,
    height: 50,
    backgroundColor: BackDefaultColor,
  },
});

Table.defaultProps = {
  // 数据
  data: [],
  // 是否打卡
  isPunch: false,
  // 点击cell
  onPress: ()=>{},
  // 滑动table
  onScroll: ()=>{},
  // 数据
  data: [],
}
Table.propTypes = {
  data: PropTypes.array.isRequired,
  isPunch: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
}

export default Table;