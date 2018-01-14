// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
// Common
import { Navigation, BackgroundView } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class SectionHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.name,{flex: 2}]}>月份</Text>
        <Text style={[styles.name]}>收入</Text>
        <Text style={[styles.name]}>支出</Text>
        <Text style={[styles.name]}>结余</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: BackDefaultColor,
  },
  name: {
    flex: 3,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 10,
    color: '#777',
  },
});

export default SectionHeader;