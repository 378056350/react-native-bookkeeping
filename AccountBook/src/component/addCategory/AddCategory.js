// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Common
import { Navigation } from '../../common/index';
// Utils
import Header from './Header';
import Table from './Table';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class AddCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: [0, 0],
    }
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _rightClick=()=>{
    
  }
  _onClickCell=(i, item)=>{
    this.setState({
      currentIndex: [item.row, i]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation 
          text={'添加支出类别'}
          leftIcon={require('../../assets/images/nav_back_n.png')}
          leftText={'返回'}
          leftClick={this._back}
          rightText={'完成'}
          rightClick={this._rightClick}
        />
        <Header currentIndex={this.state.currentIndex}/>
        <Table 
          currentIndex={this.state.currentIndex}
          onPress={(i, item)=>this._onClickCell(i, item)}
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

export default AddCategory;