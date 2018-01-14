// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../redux/action/mineAction';
import mainAction from '../../redux/action/mainAction';
// 数据库
import SaveCateManager from '../../common/StorageManager/SaveCateManager';
// 控件
import Toast, { DURATION } from '../../common/Toast/index';
import Navigation from '../../common/Navigation/Navigation';
import Header from '../../components/mine/addCategory/Header';
import Table from '../../components/mine/addCategory/Table';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class AddCategory extends Component {

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  _rightClick() {
    // 提示
    this.refs.toast.show('添加中...',DURATION.FOREVER);
    // 信息
    const { MainAction, MainReducer } = this.props;
    MainAction.addCurrentCateDataSaga(MainReducer.addCurrentCateData);
    // 定时返回
    this.timer = setTimeout(() => { 
      this._back(); 
    },1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation text={this.props.navigation.state.params.index == 0 ? '添加支出类别' : '添加收入类别'}
                    rightText={""}
                    leftText={"返回"}
                    leftIcon={require('../../assets/images/nav_back_n.png')}
                    leftClick={()=>this._back()}
                    rightText={"完成"}
                    rightStyle={{width: 0, height: 25}}    
                    rightClick={()=>this._rightClick()}        
        />
        <Header/>
        <Table/>
        <Toast ref="toast" position={'center'}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);