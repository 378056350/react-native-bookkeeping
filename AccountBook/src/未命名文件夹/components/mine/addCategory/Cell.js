// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Switch, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../../redux/action/mineAction';
import mainAction from '../../../redux/action/mainAction';
// 数据库
import SaveManager from '../../../common/StorageManager/SaveManager';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Cell extends Component {

  _onPress(data) {
    const { MineAction, MainAction, MainReducer } = this.props;
    // MineAction.addCateShowCurrentAction(data);
    // MainAction.addCurrentCateDataSaga(MainReducer.addCurrentCateData);
    var ret   = MainReducer.addCurrentCateData;
    ret.section = data.section;
    ret.row   = data.row;
    ret.inEx  = MainReducer.currentInExIndex;
    ret.isDefault = false;
    ret.icon  = data.icon;
    MainAction.updateCurrentCateDataAction(ret);
  }

  image(isIconL, i) {
    if (isIconL == true) {
      return SaveManager.getIconWithId(this.props.item.data[i].icon, 1);
    } else {
      return SaveManager.getIconWithId(this.props.item.data[i].icon, 0);
    }
  }

  view() {
    const { MainReducer } = this.props;
    let arr = [];
    for (let i=0; i<this.props.item.data.length; i++) {
      let isIconL = MainReducer.addCurrentCateData.section == this.props.item.data[i].section && 
                    MainReducer.addCurrentCateData.row == this.props.item.data[i].row;
      arr.push(
        <TouchableHighlight 
          key={i} 
          style={styles.iconTouch} 
          underlayColor={'rgba(150,150,150,1)'} 
          onPress={()=>this._onPress(this.props.item.data[i])}
        >
          <Image 
            style={{flex: 1}} 
            style={styles.icon} 
            resizeMode={'contain'} 
            source={this.image(isIconL, i)}
          />
        </TouchableHighlight>
      )
    }
    return arr;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.view()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconTouch: {
    width: (ScreenWidth - 6 * 15) / 5,
    height: (ScreenWidth - 6 * 15) / 5,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: (ScreenWidth - 6 * 15) / 5 / 2,
  },
  icon: {
    width: (ScreenWidth - 6 * 15) / 5,
    height: (ScreenWidth - 6 * 15) / 5,
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(Cell);