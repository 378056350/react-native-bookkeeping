// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, SectionList } from 'react-native';
// Common
import { Navigation, BackgroundView, Line } from '../../common/index';
// Utils
import Cell from './Cell';
import Header from './Header';
import SectionHeader from './SectionHeader';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class Table extends Component {

  _ListHeaderComponent=()=>{
    return (
      <Header
        inmax={this.props.inmax}
        exmax={this.props.exmax}
      />
    )
  }
  _ItemSeparatorComponent=()=>{
    return (
      <Line/>
    )
  }
  _renderSectionHeader=(section)=>{
    return (
      <SectionHeader/>
    )
  }
  data=()=>{
    let data = [];
    let subdata = [];
    // for (let y=0; y<12; y++) {
    //   subdata.push({
    //     month: (y + 1) + "月",
    //     name: '张三', 
    //     key: y, 
    //     row: y, 
    //   })
    // }
    // data.push({
    //   data: subdata, 
    //   title: '添加类别',
    // });
    data.push({
      data: this.props.data, 
    });
    return data;
  }
  render() {
    return (
      <View style={styles.container}>
        <BackgroundView bottomColor={BackDefaultColor}/>
        <SectionList
          sections={this.data()}
          renderItem={({item}) => <Cell item={item}/>}
          ListHeaderComponent={this._ListHeaderComponent()}
          renderSectionHeader={(section)=>this._renderSectionHeader(section.section)}
          ItemSeparatorComponent={()=>this._ItemSeparatorComponent()}
          stickySectionHeadersEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
});

Table.defaultProps = {
  inmax: 0,
  exmax: 0,
}
Table.propTypes = {
  inmax: PropTypes.number,
  exmax: PropTypes.number,
}

export default Table;