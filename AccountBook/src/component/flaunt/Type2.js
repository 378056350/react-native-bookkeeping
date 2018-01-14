// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';

class Type1 extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.back} source={require('../../assets/images/share_badge_bg.png')}>
          <Image style={styles.icon} source={require('../../assets/images/default_header.png')}/>
          <Text style={styles.name}>鲨鱼3H2Y</Text>
          <Image style={styles.badge} source={require('../../assets/images/1big_s.png')}/>
          <Text style={styles.detail1}>连续3天打卡徽章</Text>
          <Text style={styles.detail2}>成功是持续积累而成</Text>
        </ImageBackground>
        <View style={styles.bottomV}>
          <Image style={styles.share} source={require('../../assets/images/share_icon.png')}/>
          <View style={styles.bottomRight}>
            <Text style={styles.bottomRightName}>鲨鱼记账</Text>
            <Text style={styles.bottomRightDetail}>3秒钟快速记账</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  back: {
    alignItems: 'center',
    width: ScreenWidth - 80,
    height: (ScreenWidth - 80) + 40,
  },
  name: {
    fontWeight: '300',
    fontSize: 10,
    color: TitleColor,
    marginTop: 5,
    backgroundColor: 'transparent'
  },
  icon: {
    width: 40,
    height: 40,
    marginTop: 15,
  },
  badge: {
    width: (ScreenWidth - 80) - 80,
    height: (ScreenWidth - 80) - 80,
  },
  detail1: {
    fontWeight: '300',
    fontSize: 15,
    color: TitleColor,
    backgroundColor: 'transparent'
  },
  detail2: {
    fontWeight: '300',
    fontSize: 11,
    color: '#666',
    marginTop: 5,
    backgroundColor: 'transparent'
  },
  bottomV: {
    backgroundColor: 'white',
    width: ScreenWidth - 80,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  share: {
    width: 30,
    height: 30,
  },
  bottomRight: {
    marginLeft: 10,
    height: 30,
    justifyContent: 'space-around',
  },
  bottomRightName: {
    fontWeight: '400',
    fontSize: 12,
    color: TitleColor,
  },
  bottomRightDetail: {
    fontWeight: '300',
    fontSize: 11,
    color: TitleColor,
  }
});



export default Type1;