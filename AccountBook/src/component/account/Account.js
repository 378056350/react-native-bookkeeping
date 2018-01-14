// Default
import React, { Component, Transitioner } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, InEx, InExComponent, ThirdPicker, Save, Toast } from '../../common/index';
// Utils
import Keyboard from './Keyboard';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';
import DateManager from '../../common/DateManager/DateManager';

let TableComponent = null;
class Account extends Component {

  static navigationOptions = ({navigation}) => ({
    mode: 'modal',
  });
  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
      contentOffSetY: 0,
      isShowNumber: 0,
      inExCurrent: 0,
      currentDate: undefined,
      currentItem: undefined,
      day: '今天',
    }
  }
  componentDidMount() {
    if (TableComponent == null) {
      TableComponent = require('./Table').default;
    }
    this.timer = setTimeout(()=>{
      this.setState(() => ({
        needsComponent: true,
      }));
    },300);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.contentOffSetY != this.state.contentOffSetY || 
        nextState.currentItem != this.state.currentItem) {
      return false;
    }
    return true;
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onPress=(item)=>{
    if (item.key == 0) {
      const { navigate } = this.props.navigation;
      navigate('Category');
    } else {
      let i=item.key;
      this.refs.keyboard.show();
      let len = Math.ceil((i+1) / 4);
      // cell最大高度: 导航栏64 + 内间距15 + cell行数 * cell高度
      let cellMaxY = 54 + len * (ScreenWidth / 4 / 5 * 3 + 20 + 25) - this.state.contentOffSetY;
      // 键盘Y值: 屏幕高度 - 键盘高度
      let keyboardY = ScreenHeight - (ScreenWidth / 4 / 2 * 4 + 35);
      if (cellMaxY > keyboardY) {
        this.refs.table.scrollTo(this.state.contentOffSetY + cellMaxY - keyboardY)
      }
    }
    // this.refs.table.changeItem(item)
    this.setState({
      currentItem: item
    })
  }
  _onInExClick=()=>{
    this.refs.inExComponent.show()
  }
  _onScroll=(event)=>{
    this.setState({
      contentOffSetY: event.nativeEvent.contentOffset.y
    })
  }
  _onKeyboardFinish=()=>{
    const { DataAction } = this.props;

    var dateArr;
    if (this.state.currentDate == undefined) {
      dateArr = [
        DateManager.getYear()+"年",
        DateManager.getMonth()+"月",
        DateManager.getDay()+"日"
      ]
    } else {
      dateArr = this.state.currentDate;
    }
    var year = dateArr[0].replace(/年/, "");
    var month = dateArr[1].replace(/月/, "");
    var day = dateArr[2].replace(/日/, "");
    var week = DateManager.getWeek(year, month, day);
    let account = {
      sectionId: this.state.currentItem.key,
      name: this.state.currentItem.name,
      remark: this.refs.keyboard.getRemark(),
      year: parseInt(year),
      month: parseInt(month),
      week: parseInt(week),
      day: parseInt(day),
      money: parseFloat(this.refs.keyboard.getMoney()),
      inEx: this.state.inExCurrent,
    };
    // 保存数据
    DataAction.saveAccountSaga(account);
    this.refs.toast.show()
    this.timer = setTimeout(()=>{
      this.refs.toast.hide()
      const { goBack } = this.props.navigation;
      goBack()
    },500);
  }

  nav() {
    return (
      <Navigation 
        style={{justifyContent: 'center', alignItems: 'center'}}
        rightText={'取消'}
        rightClick={this._back}
        textView={
          <InEx 
            text={this.state.inExCurrent} 
            onPress={this._onInExClick}
          />
        }
      />
    )
  }
  table() {
    const { DataReducer } = this.props;
    return (
      <TableComponent 
        ref={'table'} 
        currentSelect={this.state.inExCurrent}
        data={DataReducer.category}
        onPress={this._onPress}
        onScroll={this._onScroll}
      />
    )
  }
  keyboard() {
    return (
      <Keyboard 
        ref={"keyboard"} 
        day={this.state.day}
        onPressDay={()=>{
          this.refs.picker.show(2)
        }}
        onFinishClick={this._onKeyboardFinish}
      />
    )
  }
  inExComponent() {
    return (
      <InExComponent 
        ref={'inExComponent'}
        top={NAVIGATION_HEIGHT}
        onClickCell={(i)=>{
          this.setState({
            inExCurrent: i,
          })
        // this.refs.table.changeItem(undefined);
          this.refs.keyboard.hide()
        }}
      />
    )
  }
  picker() {
    return (
      <ThirdPicker 
        ref={'picker'}
        onPickerConfirm={(value, data)=>{
          // var dateStr = DateManager.getYear()+"/"+DateManager.getMonth()+"/"+DateManager.getDay()
          // value = dateStr == value ? '今天' : dateStr;
          this.setState({
            day: value,
            currentDate: data
          })
        }}
      />
    )
  }
  toast() {
    return (
      <Toast ref={'toast'} text={'记账中...'}/>
    )
  }
  render=()=>{
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.keyboard() : null}
        {this.state.needsComponent ? this.inExComponent() : null}
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

// export default Account;
export default connect(mapStateToProps, mapDispatchToProps)(Account);