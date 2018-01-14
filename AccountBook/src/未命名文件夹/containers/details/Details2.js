// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mainAction from '../../redux/action/mainAction';
import detailsAction from '../../redux/action/detailsAction';
// 数据库
import StorageManager from '../../common/StorageManager/StorageManager';
import SaveManager from '../../common/StorageManager/SaveManager';
import SaveCateManager from '../../common/StorageManager/SaveCateManager';
import SaveDataManager from '../../common/StorageManager/SaveDataManager';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import Header from '../../components/details/details/Header';
import Table from '../../components/details/details/Table';
import DatePicker from '../../common/DatePicker/DatePicker';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Details extends Component {

  show() {

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.show()}>
          <Text>动画</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  icon: {
    flex: 1,
    height: 25, 
    width: ScreenWidth,
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MainReducer: state.MainReducer,
  DetailsReducer: state.DetailsReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MainAction: bindActionCreators(mainAction, dispatch),
  DetailsAction: bindActionCreators(detailsAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Details);