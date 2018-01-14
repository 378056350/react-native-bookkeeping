// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Animated, 
  Modal, 
  Easing, 
  TouchableOpacity, 
  TouchableHighlight 
} from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Save } from '../../common/index';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';

class MineModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      opacity: new Animated.Value(0),
      punchContinuous: 0,
    }
  }
  componentDidMount() {
    Save.loadPunchContinuous((data)=>{
      this.setState({
        punchContinuous: data + 1
      })
    })
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
      // 回调
      if (callBack != undefined) {
        callBack();
      }
      this.setState({
        modalVisible: false,
      })
    });
  }
  _onPress=()=>{
    this.hide(()=>{
      this.props.onPress()
    })
  }
  info() {
    let arr = [];
    let text = ['已连续打卡','已记录天数','总笔数'];
    let data = [
      this.state.punchContinuous, 
      0, 
      0
    ];
    for (var i=0; i<3; i++) {
      arr.push(
        <View key={i} style={styles.contentV}>
          <Text style={styles.number}>{data[i]}</Text>
          <Text style={styles.desc}>{text[i]}</Text>
        </View>
      );
    }
    return (
      <View style={styles.content}>{arr}</View>
    );
  }
  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'none'}
        transparent = {true}
        onRequestClose={()=> this.onRequestClose()}
      >
        <TouchableOpacity style={{flex: 1}} onPress={()=>this.hide()} activeOpacity={1}>
          <View style={{flex: 1}}>
            <Animated.View style={[styles.container, {
              opacity: this.state.opacity
            }]}>
            </Animated.View>
            <Animated.View style={[styles.share, {
              transform: [{
                translateY: this.state.opacity.interpolate({//映射到0.0,1.0之间
                  inputRange: [0, 1],
                  outputRange: [-ScreenWidth, (ScreenHeight - ScreenWidth / 5 * 3 / 5 * 6) / 2]
                })
              }]
            }]}>
              {/* 黄色 */}
              <View style={styles.yellow}/>
              {/* 打卡 */}
              <Image style={styles.icon} source={require('../../assets/images/signin_gif.gif')}/>
              <Text style={styles.text}>打卡成功</Text>
              {/* 关闭 */}
              <TouchableOpacity style={styles.close} activeOpacity={0.8} onPress={()=>this.hide()}>
                <Image source={require('../../assets/images/login_close.png')}/>
              </TouchableOpacity>
              {/* 信息 */}
              {this.info()}
              {/* 炫耀 */}
              <TouchableHighlight 
                style={styles.show} 
                underlayColor={'rgba(244,64,64,1)'} 
                onPress={this._onPress}
              >
                <View>
                  <Text style={styles.showT}>炫耀一下</Text>
                </View>
              </TouchableHighlight>
            </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  share: {
    position: 'absolute',
    left: ScreenWidth / 5,
    width: ScreenWidth / 5 * 3,
    backgroundColor: 'white',
    borderRadius: 7,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 20,
  },
  // 黄色
  yellow: {
    backgroundColor: StreamColor, 
    paddingTop: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    width: ScreenWidth / 5 * 3,
    height: ScreenWidth / 5 * 3 / 5 * 6 / 3,
  },
  // 关闭
  close: {
    width: 13,
    height: 13,
    position: 'absolute',
    right: 13,
    top: 6,
  },
  // 头像
  icon: {
    width: ScreenWidth / 5 * 3 / 5 * 6 / 3,
    height: ScreenWidth / 5 * 3 / 5 * 6 / 3,
    borderRadius: ScreenWidth / 5 * 3 / 5 * 6 / 3 / 2,
  },
  text: {
    fontWeight: '300',
    color: '#282828',
    backgroundColor: 'white',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 20,
  },
  // 内容
  content: {
    flexDirection: 'row',
    width: ScreenWidth / 5 * 3,
  },
  contentV: {
    flexDirection: 'column',
    width: ScreenWidth / 5 * 3 / 3,
    borderRightWidth: 0.5,
    borderRightColor: 'rgba(233,233,233,1)'
  },
  number: {
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
    color: '#282828',
  },
  desc: {
    fontSize: 9,
    fontWeight: '300',
    textAlign: 'center',
    color: 'rgba(150,150,150,1)',
    marginTop: 4,
  },
  // 炫耀
  show: {
    marginTop: 25,
    width: ScreenWidth / 5 * 3 - 30,
    height: 30,
    backgroundColor: 'rgba(255,80,80,1)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  showT: {
    color: 'white',
    fontSize: 10,
    fontWeight: '400',
    backgroundColor: 'transparent'
  }
});

MineModal.defaultProps = {
  onPress: ()=>{}
}

MineModal.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default MineModal;
