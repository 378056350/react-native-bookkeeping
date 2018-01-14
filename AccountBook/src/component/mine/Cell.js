// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, Switch, TouchableHighlight } from 'react-native';
// Utils
import Header from './Header';
import { BackgroundView, Save } from '../../common/index';
import { 
  ScreenWidth, 
  ScreenHeight, 
  StreamColor, 
  TitleColor, 
  BackDefaultColor,
} from '../../utils/index';

class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSwitch: false
    }
  }
  componentDidMount() {
    // 声音开关
    if (this.props.item.row == 2 && this.props.item.section == 1) {
      Save.loadVoice((isVoice)=>{
        this.setState({
          isSwitch: isVoice
        })
      })
    } 
    // 明细详情
    else if (this.props.item.row == 3 && this.props.item.section == 1) {
      Save.loadDetail((isVoice)=>{
        this.setState({
          isSwitch: isVoice
        })
      })
    }
  }
  _onValueChange=(isSwitch)=>{
    // 声音开关
    if (this.props.item.row == 2) {
      Save.saveVoice(isSwitch)
      this.setState({
        isSwitch: isSwitch
      })
    } 
    // 明细详情
    else {
      Save.saveDetail(isSwitch)
      this.setState({
        isSwitch: isSwitch
      })
    }
  }
  left() {
    return (
      <View style={styles.left}>
        <Image style={styles.icon} source={this.props.item.icon}/>
        <Text style={styles.name}>{this.props.item.name}</Text>
      </View>
    )
  }
  right() {
    if (this.props.item.isSwitch == true) {
      return (
        <View style={styles.right}>
          <Switch 
            onTintColor={StreamColor}
            value={this.state.isSwitch}
            onValueChange={this._onValueChange}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.right}>
          <Text style={styles.detail}>{this.props.item.detail}</Text>
          <Image source={require('../../assets/images/ad_arrow.png')} resizeMode={'contain'} style={styles.next}/>
        </View>
      )
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.props.item.isSwitch == false ? this.props.onPress : null} underlayColor={'#999'}>
        <View style={styles.container}>
          {this.left()}
          {this.right()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 17,
    height: 17,
  },
  name: {
    fontSize: 13,
    fontWeight: '300',
    color: TitleColor,
    paddingLeft: 10,
  },
  detail: {
    fontSize: 13,
    fontWeight: '300',
    color: '#999',
    paddingRight: 3,
  },
  next: {
    width: 13,
    height: 13,
  },
});

Cell.defaultProps = {
  item: {
    name: '',
    detail: '',
    isSwitch: false,
  },
  onPress: ()=>{},
  onValueChange: ()=>{},
}

Cell.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    detail:  PropTypes.string,
    isSwitch: PropTypes.bool,
  }),
  onPress: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
}

export default Cell;