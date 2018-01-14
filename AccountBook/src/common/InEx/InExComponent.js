

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  Modal,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
// Common
import { Line } from '../../common/index';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class InExComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      opacity: new Animated.Value(0),
      currentSelect: 0
    }
  }
  show() {
    this.setState({
      modalVisible: true
    })
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 1
    }).start((result)=>{
      
    });
  }
  hide(callBack) {
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 0
    }).start((result)=>{
      this.setState({
        modalVisible: false,
      })
      // 回调
      if (callBack != undefined) {
        callBack();
      }
    });
  }

  _onClickCell=(i)=> {
    this.hide();
    this.setState({
      currentSelect: i
    })
    this.props.onClickCell(i)
  }
  button() {
    let arr = [];
    let item = [
      {key: '0', row: 0, title: '支出', icon: require('../../assets/images/tally_select_expenditure.png')}, 
      {key: '1', row: 1, title: '收入', icon: require('../../assets/images/tally_select_income.png')}
    ]
    for (let i=0; i<2; i++) {
      arr.push(
        <Cell 
          key={i} 
          item={item[i]} 
          choose={this.state.currentSelect == i}
          onClick={()=>this._onClickCell(i)}
        />
      )
      if (i == 0) {
        arr.push(
          <View key={3} style={{width: ScreenWidth, height: 1, backgroundColor: 'rgba(244,244,244,1)'}}/>
        )
      }
    }
    return (
      <Animated.View style={[{
        transform: [{
          translateY: this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-80, 0] 
          })
        }]
      }]}>
        {arr}
      </Animated.View>
    )
  }
  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'none'}
        transparent = {true}
        onRequestClose={()=> this.onRequestClose()}
      >
        <TouchableOpacity onPress={()=>this.hide()} activeOpacity={1} style={{flex: 1}}>
          <Animated.View style={[styles.container,{
            opacity: this.state.opacity,
            marginTop: this.props.top,
          }]}>
            {this.button()}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

class Cell extends Component {

  render() {
    return (
      <TouchableHighlight 
        onPress={this.props.onClick} 
        underlayColor={'rgba(222,222,222,1)'}
      >
        <View style={styles.cell}>
          <Image style={styles.icon} source={this.props.item.icon}/>
          <Text style={styles.name}>{this.props.item.title}</Text>
          <Image style={[styles.select,{
            opacity: this.props.choose == true ? 1 : 0
          }]} source={require('../../assets/images/tally_select_right.png')}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'hidden'
  },
  cell: {
    backgroundColor: 'white',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 18,
    height: 18,
  },
  name: {
    paddingLeft: 10,
    fontSize: 14,
    color: TitleColor,
    flex: 1,
  },
  select: {
    width: 15,
    height: 15,
  }
});

InExComponent.defaultProps = {
  onPress: ()=>{},
  onClickCell: ()=>{},
  top: 64,
}
InExComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  onClickCell: PropTypes.func.isRequired,
  top: PropTypes.number.isRequired,
}

// 连接组件 
export default InExComponent;
