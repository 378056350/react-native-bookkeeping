// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
// Common
import { Line } from '../../common/index';
// Utils
import Cell from './Cell';
import Header from './Header';
import { UPDATE_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';

class Table extends Component {

  _ListHeaderComponent=()=>{
    return (
      <Header/>
    )
  }
  _ItemSeparatorComponent=()=>{
    return (
      <Line color={'#ddd'} left={40}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={UPDATE_JSON}
          renderItem={({item}) => <Cell item={item}/>}
          ListHeaderComponent={this._ListHeaderComponent()}
          ItemSeparatorComponent={()=>this._ItemSeparatorComponent()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default Table;