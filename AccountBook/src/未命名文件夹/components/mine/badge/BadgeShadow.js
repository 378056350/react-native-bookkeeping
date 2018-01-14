// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated, Easing, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class BadgeShadow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      icon: [
        [
          require('../../../assets/images/1big.png'),
          require('../../../assets/images/2big.png'),
          require('../../../assets/images/3big.png'),
          require('../../../assets/images/4big.png'),
          require('../../../assets/images/5big.png'),
          require('../../../assets/images/6big.png'),
          require('../../../assets/images/7big.png'),
          require('../../../assets/images/8big.png'),
          require('../../../assets/images/9big.png')
        ],
        [
          require('../../../assets/images/10big.png'),
          require('../../../assets/images/11big.png'),
          require('../../../assets/images/12big.png'),
          require('../../../assets/images/13big.png'),
          require('../../../assets/images/14big.png'),
          require('../../../assets/images/15big.png')
        ],
        [
          require('../../../assets/images/16big.png'),
          require('../../../assets/images/17big.png'),
          require('../../../assets/images/18big.png'),
          require('../../../assets/images/19big.png'),
          require('../../../assets/images/20big.png'),
          require('../../../assets/images/21big.png')
        ],
        [
          require('../../../assets/images/22big.png'),
          require('../../../assets/images/23big.png'),
          require('../../../assets/images/24big.png'),
          require('../../../assets/images/25big.png'),
          require('../../../assets/images/26big.png'),
        ],
        [
          require('../../../assets/images/27big.png'),
          require('../../../assets/images/28big.png'),
          require('../../../assets/images/29big.png'),
          require('../../../assets/images/30big.png'),
          require('../../../assets/images/31big.png')
        ],
        [
          require('../../../assets/images/32big.png'),
          require('../../../assets/images/33big.png'),
          require('../../../assets/images/34big.png'),
          require('../../../assets/images/35big.png'),
          require('../../../assets/images/36big.png')
        ],
        [
          require('../../../assets/images/37big.png'),
          require('../../../assets/images/38big.png'),
          require('../../../assets/images/39big.png'),
          require('../../../assets/images/40big.png'),
          require('../../../assets/images/41big.png')
        ],
      ]
    }
  }

  componentDidMount() {
    this.show();
  }

  show() {
    Animated.timing(this.state.opacity,{ 
        duration: 150,
        easing: Easing.elastic(0),
        toValue: 1
    }).start((result)=>{
    });
  }

  hide() {
    Animated.timing(this.state.opacity,{ 
        duration: 150,
        easing: Easing.elastic(0),
        toValue: 0
    }).start((result)=>{
      this.props.onClickHide();
    });
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={()=>this.hide()}>
        <Animated.View style={[this.props.data_style,{opacity: this.state.opacity}]} >
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
        </Animated.View>
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
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  none: {
    width: viewW, 
    height: 10, 
    backgroundColor: 'rgba(220,220,220,1)',
    position: 'absolute',
    top: 0,
  },
  name: {
    fontSize: 12,
    color: 'rgba(150,150,150,1)',
    fontWeight: '400'
  },
  desc: {
    marginTop: 10,
    fontSize: 9,
    color: 'rgba(150,150,150,1)',
    fontWeight: '300'
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
// export default connect(mapStateToProps, mapDispatchToProps)(BadgeShadow);
export default BadgeShadow;