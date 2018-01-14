// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
// Common
import { Navigation, BackgroundView } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class Cell extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.name,{flex: 2}]}>{this.props.item.month}</Text>
        <Text style={[styles.name]}>{this.props.item.exmax}</Text>
        <Text style={[styles.name]}>{this.props.item.inmax}</Text>
        <Text style={[styles.name]}>{this.props.item.exmax - this.props.item.inmax}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    flex: 3,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 11,
    color: TitleColor,
  },
});

export default Cell;