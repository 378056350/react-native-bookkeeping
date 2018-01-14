// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation } from '../../common/index';
// Utils
import { FLAUNT_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';
import { TitleColor } from '../../utils/UIUtils';

class Bottom extends Component {

  button() {
    let arr = [];
    for (let i=0; i<FLAUNT_JSON.length; i++) {
      arr.push (
        <TouchableOpacity 
          key={i} 
          activeOpacity={0.8} 
          onPress={()=>this.props.onPress(i)}
        >
          <View style={styles.button}>
            <Image style={styles.icon} source={FLAUNT_JSON[i].icon}/>
            <Text style={styles.name}>{FLAUNT_JSON[i].name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return arr;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView 
          style={styles.scroll} 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.button()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: 'white',
  },
  scroll: {
    flexDirection: 'row',
  },
  button: {
    width: ScreenWidth / 4,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  icon: {
    width: ScreenWidth / 4 / 3 * 2,
    height: ScreenWidth / 4 / 3 * 2,
  },
  name: {
    paddingTop: 5,
    fontSize: 13,
    color: TitleColor,
    fontWeight: '300',
  }
});


Bottom.defaultProps = {
  onPress: ()=>{}
}
Bottom.propTypes = {
  onPress: PropTypes.func,
}


export default Bottom;