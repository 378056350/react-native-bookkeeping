// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
// Common
import { Navigation, BackgroundView } from '../../common/index';
// Utils
import Cell from './Cell';
import { ADD_CATEGORY_JSON, ICON_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class Table extends Component {

  data=()=>{
    let arr = [];
    for (let i=0; i<ADD_CATEGORY_JSON.length; i++) {
      arr.push({
        key: i, 
        row: i,
        name: ADD_CATEGORY_JSON[i].name,
        data: ADD_CATEGORY_JSON[i].icon,
      });
    }
    return arr;
  }
  scrollTo(y) {
    this.refs.flatList.scrollToOffset({
      offset: y,
      animated: true
    })
  }
  _onPress=(i, item)=>{
    this.props.onPress(i, item)
  }
  _renderItem=(item)=>{
    var row = -1;
    if (item.row == this.props.currentIndex[0]) {
      row = this.props.currentIndex[1];
    }
    return (
      <Cell 
        item={item}
        onPress={(i)=>this._onPress(i, item)}
        row={row}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={'flatList'}
          data={this.data()}
          renderItem={({item}) => this._renderItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

Table.defaultProps = {
  onPress: ()=>{}
}
Table.propTypes = {
  onPress: PropTypes.func,
}

export default Table;