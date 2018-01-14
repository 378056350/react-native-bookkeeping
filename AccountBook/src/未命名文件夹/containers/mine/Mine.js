// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, Easing, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../redux/action/mineAction';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import MineTable from '../../components/mine/mine/MineTable';
import Share from '../../common/Share/Share';
import PunchModal from '../../components/mine/mine/PunchModal';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Mine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacityAnim: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(nextProps) {
    // 截图分享
    if (this.props.MineReducer.isShowScreenShortShare == false && 
      nextProps.MineReducer.isShowScreenShortShare == true) {
        const { navigate } = this.props.navigation;
        navigate("Screenshots");
    }
  }

  _onClick(item) {
    const { navigate } = this.props.navigation;
    if (item.section == 0) {
      if (item.row == 0) {
        navigate("Badge");
      } 
    } else if (item.section == 1) {
      if (item.row == 0) {
        navigate("Category");
      } 
      else if (item.row == 1) {
        navigate("Push");
      } 
    } else if (item.section == 2) {
      // 升级至专业版
      if (item.row == 0) {
        
      } 
      // 分享
      else if (item.row == 1) {
        // 分享
        const { MineAction } = this.props;
        MineAction.showShareAction('mine');
      } 
      else if (item.row == 4) {
        navigate("Help");
      } 
      else if (item.row == 5) {
        navigate("About");
      } 
    }
  }
  
  _punchOnPress=()=>{
    const { navigate } = this.props.navigation;
    navigate("Screenshots");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgTop}/>
        <View style={styles.bgBottom}/>
        <MineTable onClick={(item)=>this._onClick(item)}
                   onScroll={Animated.event(
                     [{nativeEvent: {contentOffset: {y: this.state.opacityAnim}}}]
                   )}/>
        <Navigation style={[styles.navigation,{
                      opacity: this.state.opacityAnim.interpolate({//映射到0.0,1.0之间
                        inputRange: [0, 100, 130],
                        outputRange: [0.0, 0.0, 1.0]
                      }),
                    }]} 
                    text="我的"
                    rightText={""}
                    isAllowTouch={false}/>
        <Share name={'mine'}/>
        <PunchModal/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  },
  navigation: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bgTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: ScreenHeight / 2,
    backgroundColor: StreamColor
  },
  bgBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: ScreenHeight / 2,
    backgroundColor: 'rgba(244,244,244,1)',
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(Mine);