// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
// Utils
import Cell from './Cell';
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
    for (let i=0; i<data.length; i++) {
      arr.push({
        key: i,
        data: data[i],
        name: '这个是标题'
      })
    }
    return arr
  }

  _ItemSeparatorComponent=()=>{
    return (
      <View style={styles.separator}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.data()}
          renderItem={({item}) => <Cell item={item} onPress={this.props.onPress}/>}
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
  },
  separator: {
    width: ScreenWidth,
    height: 10,
    backgroundColor: BackDefaultColor,
  },
});

Table.defaultProps = {
  data: [],
  onPress: ()=>{},
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func,
}

export default Table;