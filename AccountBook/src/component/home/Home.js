// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import Header from './Header';
import Table from './Table';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';
import Save, { DATE_ENUM } from '../../common/SaveManager/Save';

let TableComponent = null;
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
      currentTablePage: 0,
      homeYear: DateManager.getYear(),
      homeMonth: DateManager.getMonth()
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
  _onHeaderClick=()=>{
    this.refs.picker.show(3);
  }
  _onScrollDidEnd=(page)=>{
    const { DataReducer } = this.props;
    let keys = Object.keys(DataReducer.homeData.param);
    let data = DataReducer.homeData.range[DataReducer.homeData.range.length - 1 - page];
    this.setState({
      homeYear: data.year,
      homeMonth: data.month,
      currentTablePage: page
    })
  }
  _onPickerClick=(value, data)=>{
    const { DataReducer } = this.props;
    const range = DataReducer.homeData.range;
    for (let i=0; i<range.length; i++) {
      let remark = range[range.length-i-1].remark;
      if (value == remark) {
        this.refs.table.scrollWithPage(i);
        return;
      }
    }
    this.refs.toast.show();
    this.timer = setTimeout(()=>{
      this.refs.toast.hide();
    },1000);
  }
  _onPress=(item)=>{
    console.log(item);
    Save.loadDetail((isDetail)=>{
      if (isDetail == true) {
        const { navigate } = this.props.navigation;
        navigate('Detail', {item: item});
      }
    })
  }
  nav() {
    return (
      <Navigation 
        textView={
          <Image style={styles.icon} 
                resizeMode={"contain"}
                source={require('../../assets/images/detail_share_shark.png')}/>
        }
      />
    )
  }
  header() {
    const { DataReducer } = this.props;
    const range = DataReducer.homeData.range;
    const param = DataReducer.homeData.param;
    const paramkeys = Object.keys(param);
    const rangedata = range[range.length - 1 - this.state.currentTablePage];
    var inmax = 0, exmax = 0;
    if (rangedata != undefined && rangedata.remark != undefined) {
      if (param[rangedata.remark] != undefined) {
        inmax = param[rangedata.remark].inmax
        exmax = param[rangedata.remark].exmax
      }
    }
    const year = range.length != 0 ? rangedata.year : DateManager.getYear();
    const month = range.length != 0 ? rangedata.month : DateManager.getMonth();
    return (
      <Header 
        year={year}
        month={month}
        in={inmax}
        ex={exmax}
        onPress={this._onHeaderClick}
      />
    )
  }
  table() {
    const { DataReducer } = this.props;
    return (
      <Table 
        ref={'table'}
        data={DataReducer.homeData}
        onMomentumScrollEnd={this._onScrollDidEnd}
        onPress={this._onPress}
      />
    )
  }
  toast() {
    return (
      <Toast ref={'toast'} text={'当前月无数据...'}/>
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
        {this.header()}
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.picker() : null}
        {this.state.needsComponent ? this.toast() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  },
  icon: {
    flex: 1,
    height: 23, 
    width: ScreenWidth,
  },
});

// reducer
const mapStateToProps = state => ({
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);