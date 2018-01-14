// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList } from 'react-native';
// Common
import { Navigation, BottomButton } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import Save from '../../common/SaveManager/Save';

class Table extends Component {

  data() {
    let item = this.props.item;
    console.log(item);
    return [
      {key: 0, name: '类型', detail: item.inEx == 0 ? '支出' : '收入'},
      {key: 1, name: '金额', detail: item.money},
      {key: 2, name: '日期', detail: Save.getRemarkDeatilWithDate(item)},
      {key: 3, name: '备注', detail: item.remark.length == 0 ? item.name : item.remark},
    ]
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.data()}
          renderItem={({item}) => <Cell item={item}/>}
        />
      </View>
    );
  }
}

class Cell extends Component {

  render() {
    return (
      <View style={styles.cell}>
        <Text style={styles.name}>{this.props.item.name}</Text>
        <Text style={styles.detail}>{this.props.item.detail}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    flex: 1,
    backgroundColor: 'white',
  },
  cell: {
    width: ScreenWidth,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244,244,244,1)',
    paddingLeft: 15,
  },
  name: {
    fontSize: 12,
    fontWeight: '300',
    color: '#999',
  },
  detail: {
    fontSize: 12,
    fontWeight: '300',
    color: TitleColor,
    paddingLeft: 20,
  }
});


export default Table;