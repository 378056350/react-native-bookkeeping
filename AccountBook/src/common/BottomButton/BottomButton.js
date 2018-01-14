
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight
} from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

class BottomButton extends Component {

  button() {
    let arr = [];
    for (let i=0; i<this.props.texts.length; i++) {
      arr.push(
        <TouchableHighlight 
          style={{flex: 1}}
          activeOpacity={0.6} 
          onPress={()=>this.props.onPress(i)}
          key={i}
          underlayColor={'rgba(253,253,253,1)'}
        >
          <View style={styles.button} >
            <Text style={styles.text}>{this.props.texts[i]}</Text>
            {i != this.props.texts.length - 1 ? <View style={styles.line}/> : null}
          </View>
        </TouchableHighlight>
      )
    }
    return arr;
  }
  render() {
    return (
      <View style={styles.container}>
        {this.button()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '300',
    fontSize: 13,
    color: TitleColor,
    flex: 1,
    textAlign: 'center',
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#eee',
  }
});


BottomButton.defaultProps = {
  onPress: ()=>{},
  texts: [],
}
BottomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  texts: PropTypes.array,
}


// 连接组件 
export default BottomButton;