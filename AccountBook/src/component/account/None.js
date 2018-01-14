// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

class None extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>None</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  }
});

export default None;