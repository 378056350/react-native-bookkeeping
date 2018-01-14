// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Easing, Animated, TouchableOpacity, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class BadgeFinish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      bgTransY: new Animated.Value(0),
      icon: [
        [
          require('../../../assets/images/1big_s.png'),
          require('../../../assets/images/2big_s.png'),
          require('../../../assets/images/3big_s.png'),
          require('../../../assets/images/4big_s.png'),
          require('../../../assets/images/5big_s.png'),
          require('../../../assets/images/6big_s.png'),
          require('../../../assets/images/7big_s.png'),
          require('../../../assets/images/8big_s.png'),
          require('../../../assets/images/9big_s.png')
        ],
        [
          require('../../../assets/images/10big_s.png'),
          require('../../../assets/images/11big_s.png'),
          require('../../../assets/images/12big_s.png'),
          require('../../../assets/images/13big_s.png'),
          require('../../../assets/images/14big_s.png'),
          require('../../../assets/images/15big_s.png')
        ],
        [
          require('../../../assets/images/16big_s.png'),
          require('../../../assets/images/17big_s.png'),
          require('../../../assets/images/18big_s.png'),
          require('../../../assets/images/19big_s.png'),
          require('../../../assets/images/20big_s.png'),
          require('../../../assets/images/21big_s.png')
        ],
        [
          require('../../../assets/images/22big_s.png'),
          require('../../../assets/images/23big_s.png'),
          require('../../../assets/images/24big_s.png'),
          require('../../../assets/images/25big_s.png'),
          require('../../../assets/images/26big_s.png'),
        ],
        [
          require('../../../assets/images/27big_s.png'),
          require('../../../assets/images/28big_s.png'),
          require('../../../assets/images/29big_s.png'),
          require('../../../assets/images/30big_s.png'),
          require('../../../assets/images/31big_s.png')
        ],
        [
          require('../../../assets/images/32big_s.png'),
          require('../../../assets/images/33big_s.png'),
          require('../../../assets/images/34big_s.png'),
          require('../../../assets/images/35big_s.png'),
          require('../../../assets/images/36big_s.png')
        ],
        [
          require('../../../assets/images/37big_s.png'),
          require('../../../assets/images/38big_s.png'),
          require('../../../assets/images/39big_s.png'),
          require('../../../assets/images/40big_s.png'),
          require('../../../assets/images/41big_s.png')
        ],
      ]
    }
  }

  componentDidMount() {
    this.show();
  }

  show() {
    this.setState({
      opacity: 1
    });
    Animated.timing(this.state.bgTransY,{ 
      duration: 600000,
      toValue: 1
    }).start((result)=>{
    });
  }

  hide() {
    this.setState({
      opacity: 0
    });
    this.props.onClickHide();
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={()=>this.hide()}>
        <Animated.Image style={[styles.bg,{
          opacity: this.state.opacity == 0 ? 0 : 0.7,
          transform: [
            {
              rotateZ: this.state.bgTransY.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['-36000deg', '0deg'] 
                          })
            }
          ]
        }]} source={require('../../../assets/images/flaunt_bg.png')}/>
        <View style={[this.props.data_style,{opacity: this.state.opacity}]} >
          <View style={styles.view}>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>this.hide()}>
              <Image style={styles.close} source={require('../../../assets/images/login_close.png')}/>
            </TouchableOpacity>
            <Image style={styles.icon} source={this.state.icon[this.props.item.section][this.props.item.row]}/>
            <View style={styles.subview}>
              <View style={styles.none}/>
              <Text style={styles.name}>{this.props.item.text}徽章</Text>
              <Text style={styles.desc}>成功是持续积累而成</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.flaunt} activeOpacity={0.9}>
            <View>
              <Text style={styles.flauntText}>炫耀一下</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

let viewW = ScreenWidth / 5 * 3;
let viewH = ScreenWidth / 5 * 3 / 4 * 5;
let iconW = viewW / 3 * 2;
let iconH = iconW;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  bg: {
    position: 'absolute',
    top: -64 - ScreenHeight / 2,
    left: -(ScreenHeight * 2 - ScreenWidth) / 2,
    width: ScreenHeight * 2,
    height: ScreenHeight * 2,
    opacity: 0.8
  },
  view: {
    width: viewW,
    height: viewH,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  close: {
    width: 17,
    height: 17,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  icon: {
    position: 'absolute',
    width: iconW,
    height: iconH,
    top: (viewH - viewH / 3) / 2 - iconH / 2,
    left: viewW / 2 - iconW / 2,
  },
  subview: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: viewH / 3,
    backgroundColor: StreamColor,
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  none: {
    width: viewW, 
    height: 10, 
    backgroundColor: StreamColor,
    position: 'absolute',
    top: 0,
  },
  name: {
    fontSize: 12,
    color: 'rgba(50,50,50,1)',
    fontWeight: '300'
  },
  desc: {
    marginTop: 10,
    fontSize: 9,
    color: 'rgba(50,50,50,1)',
    fontWeight: '300'
  },
  // 炫耀一下
  flaunt: {
    position: 'absolute',
    top: (ScreenHeight - viewH) / 2 + viewH + 15,
    width: viewW - 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#ff4747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flauntText: {
    fontSize: 10,
    color: 'white',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
// export default connect(mapStateToProps, mapDispatchToProps)(BadgeFinish);
export default BadgeFinish;