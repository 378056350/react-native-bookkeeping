import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../../redux/action/mineAction';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Punch extends Component {

  _onPress=()=>{
    // 打卡
    const { MineAction, MineReducer } = this.props;
    if (MineReducer.isPunch == false) {
      MineAction.showPunchAction();  
    } 
    // 截图分享
    else {
      MineAction.showScreenShortAction();  
    }
    
  }

  render() {
    return (
      <TouchableHighlight 
        style={styles.container} 
        underlayColor={'rgba(244,244,244,1)'}
        onPress={this._onPress}
      >
        {this.view()}
      </TouchableHighlight>
    );
  }

  view() {
    const {MineReducer} = this.props;
    // 未打卡
    if (MineReducer.isPunch == false) {
      return (
        <View style={styles.view}>
          <Image style={styles.icon} source={require('../../../assets/images/signin.png')}/>
          <Text style={styles.text}>打卡</Text>
        </View>
      )
    } 
    // 已打卡
    else {
      return (
        <View style={styles.view}>
          <Text style={[styles.text, {paddingLeft: 9, paddingRight: 9}]}>已打卡</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    top: 30,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 35,
    borderWidth: 1,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 7,
  },
  text: {
    color: 'rgba(50,50,50,1)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 7,
    fontSize: 11,
    paddingLeft: 2,
    backgroundColor: 'transparent'
  }
});

// 默认值
Punch.defaultProps = {
  onPress: ()=>{},
}
// 参数类型
Punch.propTypes = {
  onPress: PropTypes.func.isRequired,
}

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MineReducer: state.MineReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MineAction: bindActionCreators(mineAction, dispatch),
});
// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Punch);