// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation, InEx } from '../../common/index';
// Utils
import Cell from './Cell';
import ChartHeader from './ChartHeader';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';

class Table extends Component {

  
  data() {
    let arr = [];
    let item = this.props.data[this.props.enum][this.props.inEx][this.props.currentDesc];
    if (item == undefined) {
      item = {data: []}
    }
    for (let i=0; i<item.data.length; i++) {
      if (item.data[i].inEx != this.props.inEx) {
        continue;
      }
      arr.push ({
        key: i, 
        row: i,
        name: item.data[i].name, 
        percent: 0.45,
        money: item.data[i].money + '',
      })
    }
    return arr;
  }
  chartData() {
    let arr = [];
    let item = this.props.data[this.props.enum][this.props.inEx][this.props.currentDesc];
    if (item == undefined) {
      item = {data: []}
    }
    var max = 0;
    var sum = 0;
    for (let i=0; i<item.data.length; i++) {
      if (item.data[i].inEx != this.props.inEx) {
        continue;
      }
      if (this.props.enum == 0) {
        
      } 
      else if (this.props.enum == 1) {
        let day = {data: [], value: 0};
        if (arr[item.data[i].day-1] != undefined) {
          day = arr[item.data[i].day - 1];
        }
        day.data.push(item.data[i]);
        day.value += item.data[i].money;
        arr[item.data[i].day-1] = day;
        sum = sum + item.data[i].money;
      } 
      else if (this.props.enum == 2) {
        let month = {data: [], value: 0};
        if (arr[item.data[i].month-1] != undefined) {
          month = arr[item.data[i].month - 1];
        }
        month.data.push(item.data[i]);
        month.value += item.data[i].money;
        arr[item.data[i].month-1] = month;
        sum = sum + item.data[i].money;
      }
    }
    for (let i=0; i<arr.length; i++) {
      let data = arr[i];
      if (data != undefined && max < data.value) {
        max = data.value;
      }
    }
    return {data: arr, max: max, sum: sum};
  }
  getCount() {
    if (this.props.enum == 0) {
      return 7;
    } else if (this.props.enum == 1) {
      return 30;
    } else if (this.props.enum == 2) {
      return 12;
    }
  }
  _ListHeaderComponent() {
    return (
      <ChartHeader 
        data={this.chartData()}
        onChangeIndex={this.props.onChangeIndex}
        onChangeEnd={this.props.onChangeEnd}  
        inEx={this.props.inEx}
        enum={this.props.enum}
      />
    )
  }
  _renderItem=(item)=>{
    return (
      <Cell item={item} onPress={()=>this.props.onPress(item)}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.data()}
          renderItem={({item}) => this._renderItem(item)}
          ListHeaderComponent={()=>this._ListHeaderComponent()}
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
    backgroundColor: 'white',
  }
});

Table.defaultProps = {
  inEx: 0,
  enum: 0,
  chart: [],
  onPress: ()=>{},
  onChangeIndex: ()=>{},
  onChangeEnd: ()=>{},
}
Table.propTypes = {
  inEx: PropTypes.number,
  enum: PropTypes.number,
  chart: PropTypes.array,
  onPress: PropTypes.func,
  onChangeIndex: PropTypes.func,
  onChangeEnd: PropTypes.func,
}

export default Table;