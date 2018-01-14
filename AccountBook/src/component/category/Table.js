// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
// Common
import { Segmentcontrol, Line } from '../../common/index';
// Utils
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor, TitleColor } from '../../utils/index';

class Table extends Component {
  
  data=()=>{
    let data = [];
    for (let x=0; x<this.props.data.length; x++) {
      let subdata = [];
      for (let y=0; y<this.props.data[x][this.props.currentSelect].length; y++) {
        subdata.push({
          icon: this.props.data[x][this.props.currentSelect][y].icon,
          name: this.props.data[x][this.props.currentSelect][y].name, 
          isDefault: this.props.data[x][this.props.currentSelect][y].isDefault,
          key: y, 
          row: y, 
          section: x,
        })
      }
      data.push({
        data: subdata, 
        title: '添加类别',
        key: x,
        section: x,
      });
    }
    return data;
  }
  _ListHeaderComponent=()=>{
    return (
      <View style={styles.headerFooter}/>
    )
  }
  _ListFooterComponent=()=>{
    return (
      <View style={styles.headerFooter}/>
    )
  }
  _renderSectionHeader=(section)=>{
    if (section.section == 1) {
      if (this.props.data.length >= 2 && this.props.data[1][this.props.currentSelect].length > 0) {
        return (
          <View style={styles.header}>
            <Text style={styles.headerText}>{section.title}</Text>
          </View>
        )
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  _ItemSeparatorComponent=()=>{
    return (
      <Line/>
    )
  }
  _renderItem=(item)=>{
    return (
      <Cell item={item}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({item}) => this._renderItem(item)}
          ListHeaderComponent={this._ListHeaderComponent()}
          ListFooterComponent={this._ListFooterComponent()}
          ItemSeparatorComponent={()=>this._ItemSeparatorComponent()}
          renderSectionHeader={(section)=>this._renderSectionHeader(section.section)}
          sections={this.data()}
          initialNumToRender={10}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
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
  headerFooter: {
    width: ScreenWidth,
    height: 15,
    backgroundColor: BackDefaultColor,
  },
  header: {
    paddingLeft: 10,
    paddingBottom: 8,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: BackDefaultColor,
    borderBottomColor: BackDefaultColor,
  },
  headerText: {
    color: TitleColor,
    fontSize: 12,
    fontWeight: '300',
    color: TitleColor,
  },
});

Table.defaultProps = {
  // onPress: ()=>{},
}
Table.propTypes = {
  // onPress: PropTypes.func.isRequired,
}


export default Table;