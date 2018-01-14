// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { Save } from '../../common/index';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      punchContinuous: 0,
    }
  }
  componentDidMount() {
    Save.loadPunchContinuous((data)=>{
      this.setState({
        punchContinuous: data
      })
    })
  }
  _onClickBadge=(oldBadge, newBadge)=>{
    if (oldBadge != newBadge) {
      this.setState({
        punchContinuous: this.state.punchContinuous + 1
      })
    }
    this.props.onClickBadge(oldBadge, newBadge)
  }
  top() {
    return (
      <View style={styles.top}>
        <Image style={styles.icon} resizeMode={'contain'} source={require('../../assets/images/default_header.png')}/>
        <Text style={styles.text}>鲨鱼3H2Y</Text>
      </View>
    )
  }
  bottom() {
    let arr = [];
    let text = ['已连续打卡','已记录天数','总笔数'];
    let data = [
      this.state.punchContinuous, 
      0, 
      0
    ];
    for (let i=0; i<3; i++) {
      arr.push(
        <View key={i} style={styles.bottomView}>
          <Text style={styles.bottomName}>{data[i]}</Text>
          <Text style={styles.bottomDesc}>{text[i]}</Text>
        </View>
      )
    }
    return (
      <View style={styles.bottom}>
        {arr}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.top()}
        {this.bottom()}
        <Badge onClickBadge={this._onClickBadge}/>
      </View>
    );
  }
}
class Badge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBadge: false,
    }
  }
  componentDidMount() {
    Save.isPunch((isPunch)=>{
      if (isPunch == true) {
        this.setState({
          isBadge: isPunch
        })
      }
    })
  }

  setBadgeVisible(isBadge) {
    this.props.onClickBadge(this.state.isBadge, isBadge);
    this.setState({
      isBadge: isBadge
    })
  }
  badge() {
    if (this.state.isBadge == true) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>已打卡</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.badge}>
          <Image style={styles.badgeIcon} resizeMode={'contain'} source={require('../../assets/images/signin.png')}/>
          <Text style={styles.badgeText}>打卡</Text>
        </View>
      )
    }
  }
  render() {
    return (
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={()=>this.setBadgeVisible(true)} 
        style={styles.badgeTouch}
      >
        {this.badge()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: StreamColor,
    alignItems: 'center',
    paddingTop: 40,
  },
  top: {
  },
  icon: {
    width: ScreenWidth / 4.5,
    height: ScreenWidth / 4.5,
    // borderRadius: ScreenWidth / 4.5 / 2,
  },
  text: {
    textAlign: 'center',
    color: TitleColor,
    fontSize: 15,
    marginTop: 5,
  },
  bottom: {
    width: ScreenWidth,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
  },
  bottomView: {
    width: ScreenWidth / 3,
  },
  bottomName: {
    textAlign: 'center',
    color: TitleColor,
    fontSize: 20,
    fontWeight: '300'
  },
  bottomDesc: {
    textAlign: 'center',
    color: '#222222',
    marginTop: 5,
    fontSize: 11,
    fontWeight: '300'
  },
  badgeTouch: {
    position: 'absolute',
    right: 15,
    top: 25,
    backgroundColor: 'white',
    borderRadius: 13,
  },
  badge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 25,
  },
  badgeIcon: {
    width: 13,
    height: 13,
    marginRight: 3,
  },
  badgeText: {
    fontSize: 11,
    color: '#222222',
    fontWeight: '300',
  }
});

Badge.defaultProps = {
  // 是否打卡
  isPunch: false,
  // 点击打卡
  onClickBadge: ()=>{},
}
Badge.propTypes = {
  isPunch: PropTypes.bool.isRequired,
  onClickBadge: PropTypes.func.isRequired,
}

export default Header;