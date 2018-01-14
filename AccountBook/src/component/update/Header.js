// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>升级至专业版</Text>
        <Text style={styles.detail}>请升级至专业版, 享受更多高级功能</Text>
        <TouchableHighlight style={styles.touch} underlayColor={'rgba(255,200,68,1)'} onPress={()=>{}}>
          <View>
            <Text style={styles.touchText}>30 购买专业版</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  name: {
    fontWeight: '500',
    color: TitleColor,
    fontSize: 22,
    marginTop: 30,
  },
  detail: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 14,
    marginTop: 10,
  },
  touch: {
    marginTop: 25,
    width: ScreenWidth - 20,
    height: 40,
    backgroundColor: StreamColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  touchText: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
  }
});

export default Header;