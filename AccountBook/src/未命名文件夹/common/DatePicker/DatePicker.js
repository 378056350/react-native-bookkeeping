

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Easing,
  Animated,
  TouchableOpacity,
} from 'react-native';
// 控件
import Picker from 'react-native-picker';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      opacity: new Animated.Value(0),
      selectValue: '2018/12/07',
      index: 0,
      isShow: false
    }
  }

  getIsShow() {
    return this.state.isShow;
  }

  fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
  }

  timePicker(index){
    var data = [];
    // 时间
    if (index == 0) {
      let hour = [];
      for(var i=0; i<24; i++){
        hour.push(i);
      }
      let minute = [];
      for(var i=0; i<60; i++){
        minute.push(i);
      }
      data = [hour, minute];
    }
    // 年份
    else if (index == 1) {
      for (var i=2000; i<2018; i++) {
        data.push(i);
      }
    }
    // 年-月-日
    else if (index == 2) {
      data = [[],[],[]];
      for (var year=2000; year<=2018; year++) {
        data[0].push(year+"年");
      }
      for (var month=1; month<=12; month++) {
        data[1].push(month+"月");
      }
      for (var day=1; day<=30; day++) {
        data[2].push(this.fix(day, 2)+"日");
      }
    }
    // 年-月
    else if (index == 3) {
      data = [[],[]];
      for (var year=2000; year<=2018; year++) {
        data[0].push(year+"年");
      }
      for (var month=1; month<=12; month++) {
        data[1].push(month+"月");
      }
    }
    
    Picker.init({
        pickerData: data,
        pickerTitleText: this.props.title,
        pickerConfirmBtnText: '确认',
        pickerCancelBtnText: '取消',
        pickerConfirmBtnColor: [50, 50, 50, 1],
        pickerCancelBtnColor: [50, 50, 50, 1],
        pickerTitleColor: [50, 50, 50, 1],
        pickerToolBarBg: [255, 255, 255, 1],
        pickerBg: [255, 255, 255, 1],
        pickerToolBarFontSize: 14,
        pickerFontSize: 15,
        selectedValue: ["2018年","12月","07日"],
        onPickerConfirm: data => this._onPickerConfirm(data),
        onPickerCancel: data => this._onPickerCancel(data),
        onPickerSelect: data => this._onPickerSelect(data)
    });
    Picker.show();

    this.setState({
      index: index
    })
  }

  _onPickerConfirm=(data)=>{
    this.hide();
    this.props.onConfirm(this.state.selectValue);
  }
  _onPickerCancel=(data)=>{
    this.hide();
    this.props.onCancel();
  }
  _onPickerSelect=(data)=>{
    var value;
    if (this.state.index == 0) {
    } else if (this.state.index == 1) {
    } else if (this.state.index == 2) {
      value = data[0]+data[1]+data[2];
      value = value.replace(/年/, "/")
      value = value.replace(/月/, "/")
      value = value.replace(/日/, "")
    }
    this.setState({
      selectValue: value
    })
  }

  show(index) {
    this.timePicker(index);
    this.setState({
      display: 'flex',
    })
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 1,
    }).start((result)=>{
      this.setState({
        isShow: true
      })
    });
  }

  hide() {
    Picker.hide();
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 0,
    }).start((result)=>{
      this.setState({
        display: 'none',
        isShow: false,
      })
    });
  }

  showYear() {
    this.timePicker();
    this.setState({
      display: 'flex',
    })
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 1,
    }).start((result)=>{

    });
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container,{
                                  display: this.state.display,
                                  top: this.props.top ? this.props.top : 0
                                }]} activeOpacity={1} onPress={()=>this.hide()}>
        <Animated.View 
          style={[
              styles.container, {
              opacity: this.state.opacity, 
              display: this.state.display,
              backgroundColor: 'rgba(50,50,50,0.4)',
              flex: 1,
              top: 0
            }
          ]} >
        </Animated.View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  }
});


// 连接组件 
export default DatePicker;