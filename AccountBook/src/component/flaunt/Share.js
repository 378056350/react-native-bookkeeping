// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// Common
import { Navigation } from '../../common/index';
// Utils
import Type1 from './Type1';
import Type2 from './Type2';
import Type3 from './Type3';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Share extends Component {

  type() {
    if (this.props.type == 0) {
      // 晒成就
      return (<Type1/>)
    } else if (this.props.type == 1) {
      // 晒徽章
      return (<Type2/>)
    } else if (this.props.type == 2) {
      // 晒单
      return (<Type3/>)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.type()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

Share.defaultProps = {
  type: 0
}
Share.propTypes = {
  type: PropTypes.number,
}

export default Share;