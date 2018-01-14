// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mainAction from '../../redux/action/mainAction';
import DateManager from '../../common/DateManager/DateManager';
// 数据库
import SaveCateManager from '../../common/StorageManager/SaveCateManager';
import SaveDataManager from '../../common/StorageManager/SaveDataManager';
import Navigation from '../../common/Navigation/Navigation';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';


import {addCategoryJson} from '../../assets/json/addCategoryJson';
import {categoryJson} from '../../assets/json/categoryJson';

class Bookkeep extends Component {
  
  // 切换
  button0=()=>{
    const { MainAction, MainReducer } = this.props;
    MainAction.changeCateAction(MainReducer.currentInExIndex == 0 ? 1 : 0);
  }
  // 刷新
  button1=()=>{
    const { MainAction } = this.props;
    MainAction.refreshCateDataSaga();
  }
  // 添加
  button2=()=>{
    const { MainAction } = this.props;
    MainAction.addCurrentCateDataSaga({
      'name' : "zhangsan",
      'inEx' : 1,
      'isDefault': false,
      'icon' : 39,
    });
  }
  // 删除
  button3=()=>{
    const { MainAction } = this.props;
    MainAction.deleteCurrentCateDataSaga({
      "id"   : 33, 
      "row"  : 33, 
      "name" : "工资", 
      "inEx" : 1, 
      "isDefault": true, 
      "icon" : 33, 
    });
  }
  // 恢复
  button4=()=>{
    const { MainAction } = this.props;
    MainAction.addCurrentCateDataSaga({
      "name" : "工资", 
      "inEx" : 1, 
      "isDefault": true, 
      "icon" : 33, 
    });
  }

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Navigation rightText={""}
                    rightClick={()=>this._back()}
                    rightText={"取消"}
                    rightStyle={{width: 0, height: 25}}
        />
        <Text style={{height: 20}}>类别</Text>
        <TouchableOpacity onPress={this.button0}>
          <Text style={styles.text}>切换</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button1}>
          <Text style={styles.text}>刷新数据</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button2}>
          <Text style={styles.text}>添加数据</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button3}>
          <Text style={styles.text}>删除数据</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button4}>
          <Text style={styles.text}>恢复数据</Text>
        </TouchableOpacity>

        <Text style={{height: 20}}>数据</Text>
        <TouchableOpacity onPress={this.button5}>
          <Text style={styles.text}>添加数据</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button6}>
          <Text style={styles.text}>删除数据</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button7}>
          <Text style={styles.text}>修改数据</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button8}>
          <Text style={styles.text}>查看数据</Text>
        </TouchableOpacity>

        <Text style={{height: 20}}>时间</Text>
        <TouchableOpacity onPress={this.button9}>
          <Text style={styles.text}>年</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button10}>
          <Text style={styles.text}>月</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button11}>
          <Text style={styles.text}>周</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.button12}>
          <Text style={styles.text}>查看数据</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }



  button5=()=>{
    SaveDataManager.add(0, '餐饮', '这个是备注', 2017, 12, 20, '13.14');
    const { MainAction, MainReducer } = this.props;
    setTimeout(()=>{
      MainAction.refreshDataRangeSaga(
        MainReducer.currentSubDateValue,
        MainReducer.currentDateRangeIndex,
      );
    },1000);
  }
  button6=()=>{
    SaveDataManager.add(1, '购物', '这个是备注', 2016, 6, 13, '23.14');
    const { MainAction, MainReducer } = this.props;
    setTimeout(()=>{
      MainAction.refreshDataRangeSaga(
        MainReducer.currentSubDateValue,
        MainReducer.currentDateRangeIndex,
      );
    },1000);
  }
  button7=()=>{
    SaveDataManager.add(2, '日用', '这个是备注', 2015, 1, 13, '33.14');
    // SaveDataManager.replace(1, 0, '餐饮', '修改过的备注', 2016, 1, 15, '13.14');
    const { MainAction, MainReducer } = this.props;
    setTimeout(()=>{
      MainAction.refreshDataRangeSaga(
        MainReducer.currentSubDateValue,
        MainReducer.currentDateRangeIndex,
      );
    },1000);
  }
  button8=()=>{
    SaveDataManager.add(2, '日用', '这个是备注', 2017, 12, 21, '33.14');
    const { MainAction, MainReducer } = this.props;
    setTimeout(()=>{
      MainAction.refreshDataRangeSaga(
        MainReducer.currentSubDateValue,
        MainReducer.currentDateRangeIndex,
      );
    },1000);
    // SaveDataManager.get((data)=>{
    //   console.log(data);
    // });
  }


  button9=()=>{
    SaveDataManager.add(1, '购物', '这个是备注', 2017, 12, 19, '10.25');
    const { MainAction, MainReducer } = this.props;
    setTimeout(()=>{
      MainAction.refreshDataRangeSaga(
        MainReducer.currentSubDateValue,
        MainReducer.currentDateRangeIndex,
      );
    },1000);
    // console.log(DateManager.getDateRange(0));
  }
  button10=()=>{
    // console.log(DateManager.getDateRange(1));
  }
  button11=()=>{
    // console.log(DateManager.getDateRange(2));
  }
  button12=()=>{
    // console.log('当前周');
    // var date = new Date();
    // console.log(DateManager.getWeekNumber(
    //     DateManager.getYear(new Date()),
    //     DateManager.getMonth(new Date()),
    //     date.getDay()
    //   ));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    padding: 10,
    backgroundColor: 'red',
    textAlign: 'center',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Bookkeep);