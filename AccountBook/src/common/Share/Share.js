

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  Modal,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import { SHARE_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor, BackDefaultColor } from '../../utils/index';

class Share extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      opacity: new Animated.Value(0),
    }
  }
  show() {
    this.setState({
      modalVisible: true
    })
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 1
    }).start((result)=>{
      
    });
  }
  hide(callBack) {
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 0
    }).start((result)=>{
      this.setState({
        modalVisible: false,
      })
      // 回调
      if (callBack != undefined) {
        callBack();
      }
    });
  }

  button() {
    let arr = [];
    for (let i=0; i<6; i++) {
      arr.push (
        <TouchableOpacity key={i} onPress={()=>this.props.onPress(i)} activeOpacity={0.8}>
          <View style={styles.button}>
            <Image style={styles.icon} source={SHARE_JSON[i].icon}/>
            <Text style={styles.name}>{SHARE_JSON[i].name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return arr;
  }
  share() {
    return (
      <Animated.View style={[styles.share,{
        transform: [{
          translateY: this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [ScreenWidth / 2 + 60, 0] 
          })
        }]
      }]}>
        <View style={styles.top}>
          {this.button()}
        </View>

        <TouchableHighlight underlayColor={'#eee'} onPress={()=>this.hide()} activeOpacity={0.5}>
          <View style={styles.bottom}>
            <Text>取消</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    )
  }
  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'none'}
        transparent = {true}
        onRequestClose={()=> this.onRequestClose()}
      >
        <TouchableOpacity onPress={()=>this.hide()} activeOpacity={1} style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Animated.View style={[styles.container,{
              opacity: this.state.opacity
            }]}/>
            {this.share()}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  share: {
    width: ScreenWidth,
    backgroundColor: BackDefaultColor,
    position: 'absolute',
    bottom: 0,
  },
  top: {
    width: ScreenWidth,
    flexDirection: 'row',
    backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  bottom: {
    width: ScreenWidth,
    height: 50,
    backgroundColor: BackDefaultColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: ScreenWidth / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ScreenWidth / 4 - 30,
    height: ScreenWidth / 4 - 30,
    marginTop: 15,
  },
  name: {
    marginBottom: 10,
    fontWeight: '300',
    color: TitleColor,
    fontSize: 11,
  }
});

Share.defaultProps = {
  onPress: ()=>{},
}

Share.propTypes = {
  onPress: PropTypes.func.isRequired,
}

// 连接组件 
export default Share;
