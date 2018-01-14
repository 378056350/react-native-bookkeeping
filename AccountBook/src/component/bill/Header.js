// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class Header extends Component {

  button() {
    let arr = [];
    let title = ['收入','支出'];
    for (let i=0; i<2; i++) {
      let max = i == 0 ? this.props.exmax : this.props.inmax;
      arr.push(
        <View key={i} style={styles.button}>
          <Text style={styles.name}>{title[i]}</Text>
          <Text style={styles.detail}>{max}</Text>
        </View>
      )
      arr.push(
        <View style={styles.line}/>
      )
    }
    return arr;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainName}>结余</Text>
        <Text style={styles.mainDetail}>{this.props.exmax - this.props.inmax}</Text>
        <View style={styles.bottom}>
          {this.button()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StreamColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainName: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 11,
    marginTop: 15,
  },
  mainDetail: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 30,
    marginTop: 10,
  },
  bottom: {
    marginTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 11,
    marginBottom: 3,
  },
  detail: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 18,
    marginLeft: 3,
  },
  line: {
    width: 0.5,
    height: 15,
    backgroundColor: '#666',
  }
});

export default Header;