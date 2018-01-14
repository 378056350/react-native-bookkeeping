// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
// Common
import { Line } from '../../common/index';
// Utils
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';

class Table extends Component {

  _ListHeaderComponent=()=>{
    return (
      <View style={styles.header}/>
    )
  }
  _ListFooterComponent=()=>{
    return (
      <View style={styles.footer}/>
    )
  }
  _ItemSeparatorComponent=()=>{
    return (
      <Line/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}]}
          renderItem={({item}) => <Cell/>}
          ListHeaderComponent={this._ListHeaderComponent()}
          ListFooterComponent={this._ListFooterComponent()}
          ItemSeparatorComponent={()=>this._ItemSeparatorComponent()}
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
  header: {
    height: 10,
    width: ScreenWidth,
  },
  footer: {
    height: 20,
    width: ScreenWidth,
  }
});

export default Table;