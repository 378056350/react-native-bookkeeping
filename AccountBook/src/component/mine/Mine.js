// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, InteractionManager } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, BackgroundView, Share, Save, ThirdPicker } from '../../common/index';
import { IS_PUNCH, PUNCH_CONTINUOUS, ACCOUNT_TOTAL } from '../../common/SaveManager/SaveEnum';
// Utils
import MineModal from './MineModal';
import { MINE_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';

let TableComponent = null;
class Mine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
      opacityAnim: new Animated.Value(0),
      // 打卡总次数
      punchContinuous: 0,
    }
  }
  componentDidMount() {
    const { DataAction } = this.props;
    DataAction.initializationDataSaga();
    // 界面
    this.timer = setTimeout(()=>{
      if (TableComponent == null) {
        TableComponent = require('./Table').default;
      }
      this.setState(() => ({
        needsComponent: true,
      }));
    },300);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  // 打卡
  _onClickBadge=(oldBadge, newBadge)=>{
    const { DataAction } = this.props;
    if (oldBadge != newBadge) {
      Save.startPunch();
      this.refs.mineModal.show();
    } else {
      const { navigate } = this.props.navigation;
      navigate('Flaunt', {title: '晒成就', type: 0});
    }
  }
  // Cell
  _onPress=(item)=>{
    const { navigate } = this.props.navigation;
    if (item.section == 0) {
      // 徽章
      if (item.row == 0) {
        var handle = InteractionManager.createInteractionHandle();
        navigate('Badge');
        InteractionManager.clearInteractionHandle(handle);
      }
    } else if (item.section == 1) {
      // 类别设置
      if (item.row == 0) {
        navigate('Category');
      }
      // 定时提醒
      else if (item.row == 1) {
        navigate('Timing');
      }
      // 声音开关
      else if (item.row == 2) {
        
      }
      // 明细详情
      else if (item.row == 3) {
        
      }
    } else if (item.section == 2) {
      // 升级至专业版
      if (item.row == 0) {
        navigate('Update');
      }
      // 推荐鲨鱼记账给好友
      else if (item.row == 1) {
        this.refs.share.show();
      }
      // 去App Store给鲨鱼记账评分
      else if (item.row == 2) {

      }
      // 意见反馈
      else if (item.row == 3) {
        
      }
      // 帮助
      else if (item.row == 4) {
        navigate('Web', {
          share: true,
          name: '帮助',
          url: 'https://mp.weixin.qq.com/s?__biz=MzI0OTE5Njk4Mg==&mid=504391578&idx=1&sn=4f03dae8e29a6ef0987ffb53a113fee2&chksm=7271ff4345067655fe0aa4049141a9d9f46248ecbe5ede63ef8bc17998627f77e9a03bfe204f&scene=0#rd'
        });
      }
      // 关于鲨鱼记账
      else if (item.row == 5) {
        navigate('About');
      }
    }
  }
  // 分享
  _onShare=(i)=>{
    console.log('share' + i);
  }


  table() {
    const { DataReducer } = this.props;
    return (
      <TableComponent 
        data={MINE_JSON}
        onClickBadge={this._onClickBadge}
        onPress={this._onPress}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.opacityAnim}}}]
        )}
      />
    )
  }
  nav() {
    return (
      <Navigation 
        text={'我的'}
        style={[styles.nav, {
          opacity: this.state.opacityAnim.interpolate({
            inputRange: [0, 35 + ScreenWidth / 4.5, 65 + ScreenWidth / 4.5],
            outputRange: [0.0, 0.0, 1.0]
          }),
        }]}
        isAllowTouch={false}
      />
    )
  }
  share() {
    return (
      <Share ref={'share'} onPress={this._onShare}/>
    )
  }
  modal() {
    return (
      <MineModal ref={'mineModal'} onPress={()=>this._onClickBadge(1,1)}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.nav() : null}
        {this.state.needsComponent ? this.share() : null}
        {this.state.needsComponent ? this.modal() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    position: 'absolute',
    top: 0,
  }
});

// reducer
const mapStateToProps = state => ({
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);