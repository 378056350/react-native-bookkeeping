// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Common
import { Navigation, BackgroundView } from '../../common/index';
// Utils
import { ADD_CATEGORY_JSON, ICON_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class Cell extends Component {

  icon() {
    let arr = [];
    for (let i=0; i<this.props.item.data.length; i++) {
      let icon = this.props.row == i ? ICON_JSON[this.props.item.data[i]].iconS : ICON_JSON[this.props.item.data[i]].icon;
      arr.push(
        <TouchableOpacity key={i} onPress={()=>this.props.onPress(i)} style={styles.button} activeOpacity={0.8}>
          <Image 
            style={styles.icon} 
            source={icon}
          />
        </TouchableOpacity>
      )
    }
    return arr;
  }
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.name}>{this.props.item.name}</Text>
        </View>
        <View style={styles.bottom}>
          {this.icon()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'column',
  },
  name: {
    fontWeight: '300',
    fontSize: 13,
    color: TitleColor,
    height: 20,
    marginTop: 3,
  },
  top: {
    paddingBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
    width: ScreenWidth,
    flexWrap: 'wrap',
  },
  button: {
    marginBottom: 15,
    width: ScreenWidth / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ScreenWidth / 5 / 5 * 3,
    height: ScreenWidth / 5 / 5 * 3,
  }
});

Cell.defaultProps = {
  onPress: ()=>{}
}
Cell.propTypes = {
  onPress: PropTypes.func,
}

export default Cell;