// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor, TitleColor } from '../../utils/index';

class Cell extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>提醒时间</Text>
        <Text style={styles.name}>每天 11:47</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
  },
  name: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 14,
  }
});

export default Cell;