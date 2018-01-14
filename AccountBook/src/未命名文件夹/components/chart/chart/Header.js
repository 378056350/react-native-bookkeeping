// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import chartAction from '../../../redux/action/chartAction';
import mainAction from '../../../redux/action/mainAction';
// 控件
import SegmentedControl from '../../../common/SegmentedControl/SegmentedControl';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {


  _onPress(i) {
    const { MainAction, MainReducer } = this.props;
    MainAction.changeDataRangeSaga(i, undefined, MainReducer.currentSubDateValue, MainReducer.currentSubDateRange);
  }

  render() {
    return (
      <View style={styles.container}>
        <SegmentedControl style={styles.seg}
                          title={["周","月","年"]}
                          onPress={(i)=>this._onPress(i)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 43,
    backgroundColor: StreamColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seg: {
    width: ScreenWidth - 40,
    height: 27,
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // nav: state.NavigationReducer,
  ChartReducer: state.ChartReducer,
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  ChartAction: bindActionCreators(chartAction, dispatch),
  MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Header);