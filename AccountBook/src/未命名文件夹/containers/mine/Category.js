// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 数据库
import SaveCateManager,{CATEGORY_TABLE_MAX, CATEGORY_DELETE_TABLE_MAX} from '../../common/StorageManager/SaveCateManager';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import Header from '../../components/mine/category/Header';
import Table from '../../components/mine/category/Table';
import AddButton from '../../common/AddButton/AddButton';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Category extends Component {

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  _onClick(item) {
    const { navigate } = this.props.navigation;
    navigate("AddCategory");
  }

  _addButtonPress() {
    const { MainReducer } = this.props;
    const { navigate } = this.props.navigation;
    navigate("AddCategory",{
      index: MainReducer.currentInExIndex,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation text="类别设置"
                    rightText={""}
                    leftText={"返回"}
                    leftIcon={require('../../assets/images/nav_back_n.png')}
                    leftClick={()=>this._back()}/>
        <Header/>
        <Table/>
        <AddButton text="添加类别" onPress={()=>this._addButtonPress()}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  },
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Category);