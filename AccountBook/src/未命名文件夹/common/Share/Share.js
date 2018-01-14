

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Image,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../redux/action/mineAction';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Share extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      modalVisible: false,
      text: ["微信","微信朋友圈","QQ","QQ空间","新浪","短信","",""],
      icon: [
        require('../../assets/images/share_wx.png'),
        require('../../assets/images/share_wxfc.png'),
        require('../../assets/images/share_qq.png'),
        require('../../assets/images/share_qqzone.png'),
        require('../../assets/images/share_sina.png'),
        require('../../assets/images/share_sms.png'),
      ]
    }
  }
  componentWillReceiveProps(nextProps) {
    // 显示分享
    if (this.props.MineReducer.isShowShare == false && 
        nextProps.MineReducer.isShowShare == true &&
        nextProps.MineReducer.name == this.props.name) {
      this.show();  
    }
    
  }
  
  //======================== 动作 ========================//
  show() {
    this.setState({
      modalVisible: true
    })
    Animated.timing(this.state.opacity,{ 
      duration: 400,
      easing: Easing.elastic(0),
      toValue: 1
    }).start((result)=>{
      
    });
  }
  hide() {
    Animated.timing(this.state.opacity,{ 
      duration: 400,
      easing: Easing.elastic(0),
      toValue: 0
    }).start((result)=>{
      // 隐藏
      const { MineAction } = this.props;
      MineAction.hideShareAction();

      this.setState({
        modalVisible: false
      })
    });
  }

  //======================== 控件 ========================//
  shadow() {
    return (
      <TouchableOpacity style={[styles.container,{backgroundColor: 'transparent'}]} onPress={()=>{this.hide()}} activeOpacity={1}>
        <Animated.View style={[styles.container,{
          opacity: this.state.opacity
        }]}/>
      </TouchableOpacity>
    )
  }
  view() {
    return (
      <Animated.View style={[styles.share, {
        bottom: this.state.opacity.interpolate({//映射到0.0,1.0之间
          inputRange: [0, 1],
          outputRange: [-130 - ScreenHeight / 5 * 2, 0]
        })
      }]}>
        {/* 顶部 */}
        {this.top()}
        {/* 底部 */}
        {this.bottom()}
      </Animated.View>
    )
  }
  top() {
    let arr = [];
    for (let i=0; i<this.state.text.length; i++) {
      arr.push(
        <TouchableHighlight key={i} style={styles.topView} underlayColor={"rgba(244,244,244,1)"} onPress={()=>{}}>
          <View style={styles.topView}>
            <Image style={styles.topIcon} source={this.state.icon[i]}/>
            <Text style={styles.topText}>{this.state.text[i]}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <View style={styles.top}>
        {arr}
      </View>
    )
  }
  bottom() {
    return (
      <TouchableHighlight style={styles.cancle} underlayColor={"rgba(244,244,244,1)"} onPress={()=>this.hide()}>
        <View style={styles.cancle}>
          <Text style={styles.cancleText}>取消</Text>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View>
        <Modal
            visible={this.state.modalVisible}
            animationType={'none'}
            transparent = {true}
            onRequestClose={()=> this.onRequestClose()}
        >
          {this.shadow()}
          {this.view()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  share: {
    position: 'absolute',
    left: 0,
    width: ScreenWidth,
    height: ScreenHeight / 5 * 2,
    backgroundColor: 'white',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 15,
  },
  topView: {
    flexDirection: 'column',
    width: (ScreenWidth - 30) / 4,
    height: (ScreenHeight / 5 * 2 - 45 - 30) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  topIcon: {
    // flex: 1,
    width: 40,
    height: 40,
  },
  topText: {
    textAlign: 'center',
    fontWeight: '300',
    color: '#282828',
    marginTop: 5,
    fontSize: 10,
  },
  cancle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: ScreenWidth,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(233,233,233,1)',
  },
  cancleText: {
    color: '#282828',
    fontSize: 14,
    fontWeight: '300',
  },
});


// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MineReducer: state.MineReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MineAction: bindActionCreators(mineAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Share);