// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation, ThirdPicker, Save} from '../../common/index';
// Utils
import Table from './Table';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';
import DateManager from '../../common/DateManager/DateManager';
import { DATE_ENUM } from '../../common/SaveManager/Save';

let TableComponent = null;
class Bill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
      currentYear: DateManager.getYear(),
      data: [],
      inmax: 0,
      exmax: 0,
    }
  }
  componentDidMount() {
    this.getDataWithYear(this.state.currentYear);
    this.props.navigation.setParams({
      rightPress: this.rightPress,
    });
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
  getDataWithYear(year) {
    let item = this.props.navigation.state.params.item;
    var inmax = 0, exmax = 0;
    var data = [];
    for (let i=1; i<=12; i++) {
      let str = Save.getRemarkWithDate({
        year: this.state.currentYear,
        month: i
      }, DATE_ENUM.MONTH);
      let param = item.param[str];
      if (param != undefined) {
        inmax = inmax + param.inmax;
        exmax = exmax + param.exmax;
        data.push({key: i, month: i + "月", inmax: param.inmax, exmax: param.exmax});
      } else {
        data.push({key: i, month: i + "月", inmax: 0, exmax: 0});
      }
    }
    this.setState({
      inmax: inmax,
      exmax: exmax,
      data: data
    })
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _rightClick=()=>{
    this.refs.picker.show(1);
  }
  _onPickerClick=(value, data)=>{
    this.setState({
      currentYear: data[0]
    });
    this.getDataWithYear(data[0])
  }
  nav() {
    return (
      <Navigation 
        text={'账单'}
        leftIcon={require('../../assets/images/nav_back_n.png')}
        leftText={'返回'}
        leftClick={this._back}
        rightText={this.state.currentYear + "年"}
        rightIcon={require('../../assets/images/time_down.png')}
        rightClick={this._rightClick}
      />
    )
  }
  table() {
    return (
      <Table 
        data={this.state.data}
        inmax={this.state.inmax}
        exmax={this.state.exmax}
      />
    )
  }
  picker() {
    return (
      <ThirdPicker 
        ref={'picker'}
        onPickerConfirm={this._onPickerClick}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.picker() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

// reducer
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bill);