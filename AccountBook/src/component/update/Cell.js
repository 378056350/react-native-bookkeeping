// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
// Common
import { Navigation } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class Cell extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} resizeMode={'contain'} source={this.props.item.icon}/>
        <View style={styles.right}>
          <Text style={styles.name}>{this.props.item.name}</Text>
          <Text style={styles.detail}>{this.props.item.detail}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackDefaultColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  right: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  name: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 12,
  },
  detail: {
    marginTop: 5,
    fontWeight: '300',
    color: '#888',
    fontSize: 12,
  }
});

Cell.defaultProps = {
  item: {
    name: '',
    detail: '',
    icon: 0,
  },
}

Cell.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    detail: PropTypes.string,
    icon: PropTypes.number,
  }),
}

export default Cell;