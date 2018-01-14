// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Image, Switch, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 数据库
import SaveManager from '../../../common/StorageManager/SaveManager';
import SaveCateManager from '../../../common/StorageManager/SaveCateManager';
// Action
import mineAction from '../../../redux/action/mineAction';
import mainAction from '../../../redux/action/mainAction';
// 控件
import Line from '../../../common/Line/Line';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Header extends Component {

  _onChangeText(text) {
    const { MainAction, MainReducer } = this.props;
    var data = MainReducer.addCurrentCateData;
    data.name = text;
    MainAction.updateCurrentCateDataAction(data);
  }

  render() {
    const { MainReducer } = this.props;
    let icon = MainReducer.addCurrentCateData.icon;
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={SaveManager.getIconWithId(icon, 2)}/>
        <TextInput 
          style={styles.input} 
          placeholder={'请输入类别名称(不超过4个汉字)'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={4}
          selectionColor={'#282828'}
          clearButtonMode={'while-editing'}
          onChangeText={(text) => this._onChangeText(text)}
        />
        <Line />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);