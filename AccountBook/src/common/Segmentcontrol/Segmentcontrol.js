

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class Segmentcontrol extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSelect: 0,
    }
  }
  componentDidMount() {
    if (this.props.defaultSelect != 0) {
      this.setState({
        currentSelect: this.props.defaultSelect
      })
    }
  }
  _onPress=(i)=>{
    this.setState({
      currentSelect: i,
    })
    this.props.onPress(i);
  }
  viewStyle=(i)=>{
    var arr = [];
    arr.push(styles.button);
    arr.push({borderColor: this.props.selectColor});
    if (i == 0) {
      arr.push(styles.left);
    } else if (i == this.props.defaultArr.length - 1) {
      arr.push(styles.right);
    }
    if (this.state.currentSelect == i) {
      arr.push({
        backgroundColor: this.props.selectColor,
      })
    } else {
      arr.push({
        backgroundColor: this.props.normalColor,
      })
    }
    if (this.props.defaultArr.length == 3 && this.state.currentSelect == 2 && i == 2) {
      arr.push({borderLeftWidth: 1});
    }
    return arr;
  }
  textStyle=(i)=>{
    if (this.state.currentSelect == i) {
      return [styles.text, {
        color: this.props.selectTitle
      }]
    } else {
      return [styles.text, {
        color: this.props.normalTitle
      }]
    }
  }
  button() {
    let arr = [];
    for (let i=0; i<this.props.defaultArr.length; i++) {
      arr.push (
        <TouchableHighlight 
          key={i}
          style={this.viewStyle(i)} 
          onPress={()=>this._onPress(i)} 
          underlayColor={'#28282844'}
        >
          <View key={i}>
            <Text style={this.textStyle(i)} >{this.props.defaultArr[i]}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    return arr;
  }
  render() {
    return (
      <View style={[styles.container,{
        width: this.props.width
      }]}>
        {this.button()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 27,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  left: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderLeftWidth: 1,
  },
  right: {
    borderRightWidth: 1,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  text: {
    fontWeight: '300',
    fontSize: 12,
  },

});

Segmentcontrol.defaultProps = {
  selectColor: TitleColor,
  normalColor: StreamColor,
  selectTitle: StreamColor,
  normalTitle: TitleColor,
  defaultSelect: 0,
  onPress: ()=>{},
  defaultArr: [],
  height: 27,
  width: ScreenWidth / 3 * 2,
}

Segmentcontrol.propTypes = {
  selectColor: PropTypes.string.isRequired,
  normalColor: PropTypes.string.isRequired,
  selectTitle: PropTypes.string.isRequired,
  normalTitle: PropTypes.string.isRequired,
  defaultSelect: PropTypes.number.isRequired,
  defaultArr: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}


// 连接组件 
export default Segmentcontrol;
