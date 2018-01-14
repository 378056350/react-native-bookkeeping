// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
// Utils
import { DISCOVER_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';

class Bottom extends Component {

  button() {
    let arr = [];
    for (let i=0; i<4; i++) {
      arr.push(
        <TouchableOpacity key={i} onPress={()=>this.props.onPress(i)} activeOpacity={0.8}>
          <View style={styles.button}>
            <Image style={styles.icon} source={DISCOVER_JSON[i].icon}/>
            <Text style={styles.name}>{DISCOVER_JSON[i].name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return arr;
  }

  render() {
    return (
      <View style={styles.container}>
        <View><Text style={styles.header}>常用功能</Text></View>
        <View style={styles.bottom}>
          {this.button()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 10,
    borderTopColor: BackDefaultColor,
  },
  header: {
    paddingLeft: 10,
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
  },
  bottom: {
    width: ScreenWidth,
    flexDirection: 'row',
  },
  button: {
    marginTop: 10,
    width: ScreenWidth / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ScreenWidth / 4 / 2,
    height: ScreenWidth / 4 / 2,
  },
  name: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
  }
});

Bottom.defaultProps = {
  onPress: ()=>{}
}

Bottom.propTypes = {
  onPress: PropTypes.func.isRequired,
}


export default Bottom;