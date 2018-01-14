// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Common
import { Segmentcontrol } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Segmentcontrol 
          onPress={this.props.onPress} 
          defaultArr={['周','月','年']}
          width={ScreenWidth - 20}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 40,
    backgroundColor: StreamColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

Header.defaultProps = {
  onPress: ()=>{},
}
Header.propTypes = {
  onPress: PropTypes.func.isRequired,
}


export default Header;