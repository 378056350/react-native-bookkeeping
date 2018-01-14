// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, ScrollView, SectionList, FlatList, TouchableOpacity } from 'react-native';
// Common
import { Line } from '../../common/index';
// Utils
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';
import { BackDefaultColor, TitleColor } from '../../utils/UIUtils';

class Table extends Component {

  scrollWithPage(page) {
    this.refs.scroll.scrollTo({x: 0, y: page * (ScreenHeight - 64 - 54 - 50), animated: false})
    this.props.onMomentumScrollEnd(parseInt(page));
  }
  _renderItem=(item)=>{
    return (
      <Cell item={item} onPress={this.props.onPress}/>
    )
  }
  _renderSectionHeader=(section)=>{
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.remark}</Text>
        <Text style={styles.headerText}>{section.detail}</Text>
      </View>
    )
  }
  _ItemSeparatorComponent=()=>{
    return (
      <Line left={40}/>
    )
  }
  data(i) {
    let section = [];
    let param = this.props.data.param;
    let key = this.props.data.range[i].remark;
    if (param[key] != undefined) {
      let keys = Object.keys(param[key].data);
      keys.sort((a,b)=>{
        return b-a;
      })
      for (let i=0; i<keys.length; i++) {
        let data = [];
        for (let y=0; y<param[key].data[keys[i]].data.length; y++) {
          let dict = param[key].data[keys[i]].data[y];
          dict['key'] = y;
          data.push(dict)
        }
        let detail = '';
        if (param[key].data[keys[i]].inmax != 0) {
          detail = detail + '支出:  ' + param[key].data[keys[i]].inmax;
        }
        if (param[key].data[keys[i]].exmax != 0) {
          detail = detail + '   ' + '收入:  ' + param[key].data[keys[i]].exmax;
        }
        section.push({
          data: data, 
          remark: param[key].data[keys[i]].remark,
          detail: detail,
        })
      }
      return section;
    }
    return [];
  }
  list() {
    let arr = [];
    for (let i=0; i<this.props.data.range.length; i++) {
      arr.push(
        <SectionList
          key={i}
          style={{height: ScreenHeight - 64 - 54 - 50}}
          renderItem={({item}) => this._renderItem(item)}
          renderSectionHeader={({section}) => this._renderSectionHeader(section)}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          sections={this.data(this.props.data.range.length - i -1)}
          ListEmptyComponent={<NoData/>}
          stickySectionHeadersEnabled={false}
        />
      )
    }
    return arr;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{height: ScreenHeight - 64 - 54 - 50}}
          pagingEnabled={true}
          ref={'scroll'}
          onMomentumScrollEnd={(event)=>{
            let height = event.nativeEvent.layoutMeasurement.height;
            let page = event.nativeEvent.contentOffset.y / height;
            this.props.onMomentumScrollEnd(parseInt(page));
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {this.list()}
        </ScrollView>
      </View>
    );
  }
}

class NoData extends Component {

  render() {
    return (
      <View style={styles.noData}>
        <Image 
          style={styles.icon} 
          source={require('../../assets/images/no_data.png')}
        />
        <Text style={styles.name}>暂无数据</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight - 64 - 54 - 50,
    backgroundColor: 'white',
  },
  header: {
    width: ScreenWidth,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: BackDefaultColor,
  },
  headerText: {
    fontSize: 12,
    color: TitleColor,
    fontWeight: '300',
  },
  noData: {
    width: ScreenWidth,
    height: ScreenHeight - 64 - 54 - 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ScreenWidth / 4,
    height: ScreenWidth / 4,
  },
  name: {
    fontWeight: '300',
    color: 'rgba(200,200,200,1)',
    fontSize: 12,
  }
});


Table.defaultProps = {
  onMomentumScrollEnd: ()=>{},
  onPress: ()=>{},
}
Table.propTypes = {
  onMomentumScrollEnd: PropTypes.func,
  onPress: PropTypes.func,
}

export default Table;