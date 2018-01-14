

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
// 导航栏高度
const navigationH = Platform.select({ios: 64, android: 44});
const navigationTop = Platform.select({ios: 20, android: 0});

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rightDisabled: false,
      leftDisabled: false
    }
  }

  componentWillUnmount() {
    this.timer1 && clearTimeout(this.timer1);
    this.timer2 && clearTimeout(this.timer2);
  }

  title() {
    if (this.props.text) {
      return (
        <View style={styles.navTitle}>
          <Text style={{fontSize: Platform.select({ios: 16, android: 18}), fontWeight: '400', textAlign: 'center', color: TitleColor}}>
            {this.props.text}
          </Text>
        </View>
      )
    } else if (this.props.textView != undefined) {
      return (
        this.props.textView
      )
    }
  }

  leftClick=()=>{
    this.props.leftClick();
    this.setState({
      leftDisabled: true
    })
    this.timer1 = setTimeout(() => {
      this.setState({
        leftDisabled: false
      })
    }, 500);
  }

  rightClick=()=>{
    this.props.rightClick();
    this.setState({
      rightDisabled: true
    })
    this.timer2 = setTimeout(() => {
      this.setState({
        rightDisabled: false
      })
    }, 500);
  }
  
  render() {
    return (
      <Animated.View style={[styles.container, this.props.style]}
                     pointerEvents={this.props.isAllowTouch == true ? 'auto' : 'none'}>
        {this.title()}
        <TouchableOpacity 
          style={styles.touchLeft} 
          disabled={this.state.leftDisabled} 
          activeOpacity={0.6} 
          onPress={this.props.leftClick}
        >
          <Image source={this.props.leftIcon} style={[styles.backIcon,{
            opacity: this.props.leftIcon == false ? 0 : 1,
            width: this.props.leftIcon ? 20 : 0,
          }]}/>
          <Text style={styles.backText}>{this.props.leftText}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.touchTwoLeft} 
          disabled={this.state.leftDisabled} 
          activeOpacity={0.6} 
          onPress={this.props.leftTwoClick}
        >
          <Text style={styles.backText}>{this.props.leftTwoText}</Text>
        </TouchableOpacity>


        <TouchableOpacity 
          style={[styles.touchRight]} 
          disabled={this.state.rightDisabled} 
          activeOpacity={0.6} 
          onPress={this.rightClick}
        >
          <Text style={styles.rightText}>{this.props.rightText}</Text>
          <Image source={this.props.rightIcon} style={[styles.rightIcon,{
            opacity: this.props.rightIcon == undefined ? 0 : 1,
            width: this.props.rightIcon ? 20 : 0,
          },this.props.rightStyle]}/>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: navigationH,
    backgroundColor: StreamColor,
    flexDirection: 'row',
    paddingTop: navigationTop,
    alignItems: 'center',
  },
  touchLeft: {
    flexDirection: 'row', 
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    height: 44,
    top: navigationTop,
  },
  touchTwoLeft: {
    flexDirection: 'row', 
    alignItems: 'center',
    position: 'absolute',
    left: 70,
    height: 44,
    top: navigationTop,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,  
  },
  backText: {
    marginLeft: 3,
    fontSize: 13, 
  },
  navTitle: {
    position: 'absolute',
    top: navigationTop,
    height: 44,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchRight: {
    flexDirection: 'row', 
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    height: 44,
    top: navigationTop,
    marginRight: 10
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
  rightText: {
    marginRight: 3,
    fontSize: 13,
  }
});


Navigation.defaultProps = {
  isAllowTouch: true,
  leftClick: ()=>{},
  leftText: '',
  leftIcon: null,
  rightClick: ()=>{},
  rightText: '',
  rightIcon: null,
  rightStyle: {},
}

Navigation.propTypes = {
  isAllowTouch: PropTypes.bool.isRequired,
  leftClick:    PropTypes.func.isRequired,
  leftText:     PropTypes.string.isRequired,
  leftIcon:     PropTypes.number,
  rightClick:   PropTypes.func.isRequired,
  rightText:    PropTypes.string.isRequired,
  rightIcon:    PropTypes.number,
  rightStyle:   PropTypes.shape({
    width:  PropTypes.number,
    height: PropTypes.number
  }),
}


// 连接组件 
export default Navigation;