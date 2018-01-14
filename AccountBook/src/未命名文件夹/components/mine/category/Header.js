// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, FlatList, ListView, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../../redux/action/mineAction';
import mainAction from '../../../redux/action/mainAction';
// 控件
import SegmentedControl from '../../../common/SegmentedControl/SegmentedControl';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {
  
  _onPress(i) {
    const {MainAction } = this.props;
    MainAction.changeCateAction(i);
  }

  render() {
    const { MainReducer } = this.props;
    return (
      <View style={styles.container}>
        <SegmentedControl 
          style={styles.seg}
          title={["支出","收入"]}
          current={MainReducer.currentInExIndex}
          onPress={(i)=>this._onPress(i)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 37,
    backgroundColor: StreamColor,
    alignItems: 'center',
  },
  seg: {
    width: ScreenWidth / 3 * 2,
    height: 27,
    
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MineReducer: state.MineReducer,
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MineAction: bindActionCreators(mineAction, dispatch),
  MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Header);