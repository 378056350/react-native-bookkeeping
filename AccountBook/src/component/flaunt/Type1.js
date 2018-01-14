// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { Save } from '../../common/index';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class Type1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      punchContinuous: 0,
    }
  }
  componentDidMount() {
    Save.loadPunchContinuous((data)=>{
      this.setState({
        punchContinuous: data + 1
      })
    })
  }
  text() {
    let arr = [];
    let text = ['已连续打卡','记账总天数','记账总笔数'];
    let data = [
      this.state.punchContinuous, 
      0, 
      0
    ];
    for (let i=0; i<3; i++) {
      arr.push(
        <View key={i} style={styles.button}>
          <Text style={styles.buttonName}>{data[i]}</Text>
          <Text style={styles.buttonDetail}>{text[i]}</Text>
        </View>
      )
    }
    return arr;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>记账成就</Text>
        <Image style={styles.icon} source={require('../../assets/images/default_header.png')}/>
        <Text style={styles.detail}>鲨鱼3H2Y</Text>
        <View style={styles.bottom}>
          {this.text()}
        </View>
        <View style={styles.bottomV}>
          <Image style={styles.share} source={require('../../assets/images/sigin_icon.png')}/>
          <View style={styles.bottomRight}>
            <Text style={styles.bottomRightName}>鲨鱼记账</Text>
            <Text style={styles.bottomRightDetail}>3秒钟快速记账</Text>
          </View>
        </View>
        <Image style={styles.free} resizeMode={'contain'} source={require('../../assets/images/sigin_honor.png')}/>
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
  name: {
    fontWeight: '400',
    fontSize: 14,
    color: TitleColor,
    marginTop: 15,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 15,
  },
  detail: {
    fontWeight: '300',
    fontSize: 12,
    color: TitleColor,
    marginTop: 5,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonName: {
    fontWeight: '300',
    fontSize: 13,
    color: TitleColor,
  },
  buttonDetail: {
    fontWeight: '300',
    fontSize: 10,
    color: TitleColor,
    marginTop: 5,
  },
  free: {
    position: 'absolute',
    width: ScreenWidth / 2,
    left: (ScreenWidth - 80) / 4,
    bottom: 30,
  },
  bottomV: {
    backgroundColor: StreamColor,
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