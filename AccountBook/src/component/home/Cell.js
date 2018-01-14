// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
// Utils
import { ICON_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';

class Cell extends Component {
  

  render() {
    return (
      <TouchableHighlight onPress={()=>this.props.onPress(this.props.item)} underlayColor={'#bbb'}>
        <View style={styles.container}>
          <Image style={styles.icon} source={ICON_JSON[this.props.item.id].iconL}/>
          <Text style={styles.name}>{this.props.item.name}</Text>
          <Text style={styles.number}>{this.props.item.inEx == 0 ? -this.props.item.money : this.props.item.money}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  name: {
    paddingLeft: 10,
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
    flex: 1
  },
  number: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
  }
});

Cell.defaultProps = {
  item: {
    name: '',
    money: 0,
  },
  onPress: ()=>{}
}
Cell.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    money: PropTypes.number,
  }),
  onPress: PropTypes.func,
}

export default Cell;