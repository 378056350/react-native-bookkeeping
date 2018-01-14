// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';

class Type3 extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.time}>2017年12月12日</Text>
          <Text style={styles.name}>水果</Text>
          <Text style={styles.detail}>这个是描述</Text>
          <View style={styles.topMoney}>
            <Text style={styles.inEx}>支出</Text>
            <Text style={styles.money}>6.00</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <Image style={styles.image} resizeMode={'contain'} source={require('../../assets/images/share_income2.png')}/>
        {/* share_expend2 */}
        {/* share_income1 */}
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
  top: {
    flex: 1,
    width: ScreenWidth - 80,
    paddingLeft: 10,
    paddingTop: 10,
  },
  time: {
    fontWeight: '300',
    fontSize: 11,
    color: '#666',
  },
  name: {
    paddingTop: 5,
    fontWeight: '300',
    fontSize: 18,
    color: TitleColor,
  },
  detail: {
    paddingTop: 8,
    fontWeight: '300',
    fontSize: 10,
    color: '#666',
  },
  topMoney: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inEx: {
    paddingTop: 5,
    fontWeight: '300',
    fontSize: 12,
    color: '#666',
    paddingBottom: 5,
  },
  money: {
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight: '300',
    fontSize: 28,
    color: 'red',
  },
  bottom: {
    width: ScreenWidth - 80,
    height: (ScreenWidth - 80) / 400 * 375,
  },
  image: {
    width: ScreenWidth - 80,
    height: (ScreenWidth - 80) / 400 * 375,
  }
});

export default Type3;