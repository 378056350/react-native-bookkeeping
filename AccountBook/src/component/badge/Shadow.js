// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation } from '../../common/index';
// Utils
import { BADGE_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class Shadow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }
  show() {
    this.setState({
      modalVisible: true
    })
  }
  hide=()=>{
    this.setState({
      modalVisible: false
    })
  }
  badge=()=>{
    return (
      <View style={styles.badge}>
        
      </View>
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
        <TouchableOpacity style={styles.container} onPress={this.hide} activeOpacity={1}>
          <View style={[styles.container,{flex: 1}]}>
            <Hud onPress={this.hide}
                 onShow={()=>{
                  this.hide()
                  this.props.onShow()
                 }}/>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

class Hud extends Component {

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.hud}>
          <Image source={require('../../assets/images/1big_s.png')} style={styles.icon}/>
          <View style={[styles.bottom, {
            backgroundColor: StreamColor
          }]}>
            <Text style={styles.name}>连续50天打卡徽章</Text>
            <Text style={styles.detail}>用实力让情怀落地</Text>
          </View>
          <TouchableOpacity style={styles.close} onPress={this.props.onPress} activeOpacity={0.8}>
            <Image source={require('../../assets/images/login_close.png')} style={{flex: 1}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.show} activeOpacity={0.9} onPress={this.props.onShow}>
          <View style={styles.show}>
            <Text style={styles.showText}>炫耀一下</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hud: {
    width: ScreenWidth / 5 * 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginTop: 30,
    marginBottom: 30,
    width: ScreenWidth / 5 * 3 / 5 * 3,
    height: ScreenWidth / 5 * 3 / 5 * 3,
  },
  bottom: {
    backgroundColor: '#bbb',
    width: ScreenWidth / 5 * 3,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  name: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  detail: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '300',
    color: '#777',
    marginTop: 10,
  },
  close: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  show: {
    width: ScreenWidth / 5 * 3 - 20,
    borderRadius: 7,
    backgroundColor: '#ff7777',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
  }
});

export default Shadow;