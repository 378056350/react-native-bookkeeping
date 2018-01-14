

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';

import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class EditButton extends Component {

  view() {
    let arr = [];
    let title = ["编辑","","删除"];
    for (let i=0; i<3; i++) {
      if (i != 1) {
        arr.push (
          <TouchableHighlight key={i} style={styles.view} underlayColor={"rgba(244,244,244,1)"} onPress={()=>{}}>
            <View style={styles.view}>
              <Text style={styles.text}>{title[i]}</Text>
            </View>
          </TouchableHighlight>
        )
      } else {
        arr.push (
          <View key={i} style={styles.line}/>
        )
      }
    }
    return arr;
  }

  render() {
    return (
      <View style={[this.props.style,styles.container]}>
        {this.view()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 50,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(233,233,233,1)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#282828",
    fontSize: 13,
    fontWeight: '300'
  },
  line: {
    width: 0.5,
    height: 25,
    backgroundColor: 'rgba(233,233,233,1)',
  },
});


// 连接组件 
export default EditButton;