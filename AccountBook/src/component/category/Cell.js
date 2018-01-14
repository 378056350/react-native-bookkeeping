// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { ICON_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class Cell extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.operating} source={require('../../assets/images/category_delete.png')}/>
        <Image style={styles.icon} source={ICON_JSON[this.props.item.icon].icon}/>
        <Text style={styles.name}>{this.props.item.name}</Text>
        <Text style={styles.detail}>{this.props.item.isDefault == false ? '(自定义)' : ''}</Text>
        <Image style={styles.menu} source={require('../../assets/images/guide_sort.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 40,
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
  },
  operating: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  name: {
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 14,
    color: TitleColor,
  },
  detail: {
    flex: 1,
    marginLeft: 10,
    fontWeight: '200',
    fontSize: 14,
    color: '#555',
  },
  menu: {
    width: 30,
    height: 20,
    marginRight: 10,
  }
});

Cell.defaultProps = {
  icon: 0,
  name: '0',
  isDefault: true,
}
Cell.propTypes = {
  icon: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isDefault: PropTypes.bool.isRequired,
}


export default Cell;