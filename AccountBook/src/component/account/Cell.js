// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Common
import { Navigation, BackgroundView } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class Cell extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.8}>
        <View style={styles.container}>
          <Image style={styles.icon} source={this.props.item.icon}/>
          <Text style={styles.name}>{this.props.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth / 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    width: ScreenWidth / 4 / 5 * 3,
    height: ScreenWidth / 4 / 5 * 3,
  },
  name: {
    fontWeight: '300',
    fontSize: 11,
    color: TitleColor,
    height: 20,
    marginTop: 5,
  }
});

Cell.defaultProps = {
  onPress: ()=>{}
}
Cell.propTypes = {
  onPress: PropTypes.func,
}

export default Cell;