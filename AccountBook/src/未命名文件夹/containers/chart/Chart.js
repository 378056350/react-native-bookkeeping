// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import chartAction from '../../redux/action/chartAction';
import mainAction from '../../redux/action/mainAction';
// 控件
import InExpe from '../../common/InExpe/InExpe';
import InExpeView from '../../common/InExpe/InExpeView';
import Navigation from '../../common/Navigation/Navigation';
import Header from '../../components/chart/chart/Header';
import ScaleHUD from '../../common/Scale/ScaleHUD';
import TimeHeader from '../../components/chart/chart/TimeHeader';
import Table from '../../components/chart/chart/Table';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Chart extends Component {

  _onClick(item) {
    const { MainAction } = this.props;
    MainAction.changeCateAction(item.row);
  }

  render() {
    const { MainReducer } = this.props;
    return (
      <View style={styles.container}>
        <Navigation textView={
          <InExpe onPress={()=>this.refs.inExpeView.show()} title={MainReducer.currentInExIndex == 1 ? '收入' : '支出'}/>
        }/>
        <Header/>
        <TimeHeader/>
        <Table/>
        <ScaleHUD/>
        <InExpeView ref={"inExpeView"} isShowNumber={MainReducer.currentInExIndex} top={64 + 43} onClick={(item)=>this._onClick(item)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  ChartReducer: state.ChartReducer,
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  ChartAction: bindActionCreators(chartAction, dispatch),
  MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Chart);