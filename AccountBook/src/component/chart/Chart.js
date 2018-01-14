// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, InEx, InExComponent } from '../../common/index';
// Utils
import Header from './Header';
import ScrollHeader from './ScrollHeader';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';

let TableComponent = null;
let HudComponent = null;
class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
      inExCurrentIndex: 0,
      enumCurrentIndex: 0,
      daysCurrentIndex: 0,
      chart: [],
      currentDesc: ''
    }
  }
  componentDidMount() {
    this.timer = setTimeout(()=>{
      if (TableComponent == null) {
        TableComponent = require('./Table').default;
      }
      if (HudComponent == null) {
        HudComponent = require('./Hud').default;
      }
      this.setState(() => ({
        needsComponent: true,
      }));
    },300);
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onInExShow=()=>{
    this.refs.inExComponent.show()
  }
  // 收入/支出
  _onInExClick=(index)=>{
    const { DataReducer } = this.props;
    let str = DataReducer.chartData[this.state.enumCurrentIndex][2];
    this.setState({
      currentDesc: str[this.state.daysCurrentIndex].remark,
      inExCurrentIndex: index,
    });
  }
  // 日/月/年
  _onHeaderClick=(index)=>{
    const { DataReducer } = this.props;
    let str = DataReducer.chartData[index][2];
    let count = DataReducer.chartData[index][2].length - 1;
    this.setState({
      currentDesc: str[count].remark,
      enumCurrentIndex: index,
      daysCurrentIndex: count,
    });
    this.refs.scroll.onMove(count);
  }
  // 月份选择
  _onSectionHeaderClick=(index)=>{
    const { DataReducer } = this.props;
    let str = DataReducer.chartData[this.state.enumCurrentIndex][2];
    this.setState({
      currentDesc: str[index].remark,
      daysCurrentIndex: index,
    })
  }
  _onChartHeaderClick=(index)=>{
    let count = this.refs.table.getCount();
    var padding = (ScreenWidth - 12 * 2) / (count - 1);
    var offsetX = 10 + padding * index;
    var lineOffsetX = 0;
    offsetX = offsetX - ScreenWidth / 2 / 2 + 2;
    if (offsetX < 0) {
      lineOffsetX = -offsetX;
      offsetX = 0;
    }
    if ((offsetX + ScreenWidth / 2) > ScreenWidth) {
      lineOffsetX = -(offsetX - ScreenWidth / 2);
      offsetX = ScreenWidth - ScreenWidth / 2;
    }
    this.refs.hud.setHudWithOffsetX(offsetX, lineOffsetX);
    if (index < 0) {
      this.refs.hud.hide()
    }

    this.refs.hud.show()
  }
  _onChartHeaderEndClick=()=>{
    this.refs.hud.hide()
  }
  _onCellClick=(item)=>{
    // const { navigate } = this.props.navigation;
    // navigate('Detail', {item: item});
    // console.log(item);
  }
  nav() {
    return (
      <Navigation 
        style={{justifyContent: 'center', alignItems: 'center'}}
        textView={
          <InEx 
            text={this.state.inExCurrentIndex} 
            onPress={this._onInExShow}
          />
        }
      />
    )
  }
  header() {
    return (
      <Header onPress={this._onHeaderClick}/>
    )
  }
  scroll() {
    const { DataReducer } = this.props;
    return (
      <ScrollHeader 
        ref={'scroll'}
        onPress={this._onSectionHeaderClick}
        range={DataReducer.chartData[this.state.enumCurrentIndex][2]}
      />
    )
  }
  table() {
    const { DataReducer } = this.props;
    return (
      <TableComponent 
        ref={'table'}
        data={DataReducer.chartData}
        onPress={this._onCellClick}
        onChangeIndex={this._onChartHeaderClick}  
        onChangeEnd={this._onChartHeaderEndClick}
        inEx={this.state.inExCurrentIndex}
        enum={this.state.enumCurrentIndex}
        chart={this.state.chart}
        currentDesc={this.state.currentDesc}
      />
    )
  }
  hud() {
    return (
      <HudComponent ref={'hud'}/>
    )
  }
  inExComponent() {
    return (
      <InExComponent 
        ref={'inExComponent'}
        top={40 + NAVIGATION_HEIGHT}
        onClickCell={this._onInExClick}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.header()}
        {this.scroll()}
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.hud() : null}
        {this.state.needsComponent ? this.inExComponent() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);