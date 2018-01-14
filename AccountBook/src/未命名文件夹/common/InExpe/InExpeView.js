

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Easing
} from 'react-native';

import Cell from './Cell';
import Line from '../../common/Line/Line';
import {ScreenWidth, ScreenHeight, StreamColor, NavigationTitle} from '../../public/Public';

class InExpeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      modalVisible: false,
      timeAnim: 300,
      data: [
        {key: '0', row: 0, title: '支出', icon: require('../../assets/images/tally_select_expenditure.png')}, 
        {key: '1', row: 1, title: '收入', icon: require('../../assets/images/tally_select_income.png')}],
    }
  }

  // 显示
  show() {
    this.setState({
      modalVisible: true
    })
    Animated.timing(this.state.opacity,{ 
      duration: this.state.timeAnim,
      easing: Easing.elastic(0),
      toValue: 1
    }).start((result)=>{
      
    });
  }
  // 隐藏
  hide() {
    Animated.timing(this.state.opacity,{ 
      duration: this.state.timeAnim,
      easing: Easing.elastic(0),
      toValue: 0
    }).start((result)=>{
      this.setState({
        modalVisible: false
      })
    });
  }


  _itemSeparatorComponent() {
    return (
      <Line left={40}/>
    )
  }

  _cell(item) {
    return (
      <Cell item={item} 
            isShow={this.props.isShowNumber == item.row} 
            onPress={(item)=>this._onPress(item)}/>
    )
  }

  _onPress(item) {
    this.props.onClick(item);
    this.hide();
  }

  // 背景
  shadow() {
    return (
      <TouchableOpacity 
          onPress={()=>{this.hide()}} 
          activeOpacity={1} 
          style={[styles.container,{
              backgroundColor: 'transparent',
          }]}
      >
        <Animated.View style={[styles.container,{
          opacity: this.state.opacity,
          marginTop: this.props.top,
        }]}/>
      </TouchableOpacity>
    )
  }
  // 收入/支出
  view() {
    return (
      <View style={[styles.view,{
        marginTop: this.props.top,
        overflow: 'hidden'
      }]}>
        <Animated.View style={[{
          backgroundColor: 'white',
          height: 80,
          transform: [{
            translateY: this.state.opacity.interpolate({//映射到0.0,1.0之间
              inputRange: [0, 1],
              outputRange: [-80, 0]
            })
          }]
        }]}>
          <FlatList
            style={{flex: 1}}
            bounces={false}
            ItemSeparatorComponent={()=>this._itemSeparatorComponent()}
            data={this.state.data}
            renderItem={({item}) => this._cell(item)}
          />
        </Animated.View>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Modal
            visible={this.state.modalVisible}
            animationType={'none'}
            transparent = {true}
            onRequestClose={()=> this.onRequestClose()}
            ItemSeparatorComponent={()=>this._itemSeparatorComponent()}
        >
          {this.shadow()}
          {this.view()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  view: {
    position: 'absolute',
    width: ScreenWidth,
    height: 80,
  }
});


// 连接组件 
export default InExpeView;