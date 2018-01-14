// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import bookkeepAction from '../../redux/action/bookkeepAction';
import mainAction from '../../redux/action/mainAction';
// 数据库
import SaveManager from '../../common/StorageManager/SaveManager';
import SaveCateManager from '../../common/StorageManager/SaveCateManager';
// 控件
import InExpe from '../../common/InExpe/InExpe';
import InExpeView from '../../common/InExpe/InExpeView';
import Navigation from '../../common/Navigation/Navigation';
import Keyboard from '../../components/bookkeep/bookkeep/Keyboard';
import DatePicker from '../../common/DatePicker/DatePicker';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Bookkeep extends Component {

  static navigationOptions = {
    mode: 'modal',
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      contentOffSetY: 0,
      day: '今天',
      isShowNumber: 0,
    }
  }

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  // 收入/支出
  _onClick(item) {
    this.setState({
      inExpe: item.title,
      isShowNumber: item.row,
    })
  }
  // 点击cell
  _onPress(i) {
    this.refs.keyboard.show();
    let len = Math.ceil((i+1) / 4);
    // cell最大高度: 导航栏64 + 内间距15 + cell行数 * cell高度
    let cellMaxY = 64 + 15 + len * ((ScreenWidth - 30) / 4 + 20) - this.state.contentOffSetY;
    // 键盘Y值: 屏幕高度 - 键盘高度
    let keyboardY = ScreenHeight - (ScreenWidth / 4 / 2 * 4 + 35);
    if (cellMaxY > keyboardY) {
      this.refs.scroll.scrollTo({x:0, y: this.state.contentOffSetY + cellMaxY - keyboardY, animated: true})
    }
  }
  _onScroll(e) {
    this.setState({
      contentOffSetY: e.nativeEvent.contentOffset.y
    })
  }
  _onPressDay() {
    this.refs.datePicker.show(2);
  }
  _onConfirm(value) {
    this.setState({
      day: value
    })
  }
  _onInExClick(item) {
    this._onClick(item);
    // const { BookkeepAction, BookkeepReducer } = this.props;
    // BookkeepAction.showInEx(item.row)

    this.refs.keyboard.hide();

    const { MainAction } = this.props;
    MainAction.changeCateAction(item.row);
  }

  image(icon, i) {
    const { MainReducer } = this.props;
    return SaveManager.getIconWithId(icon, 0);
  }


  view() {
    const { MainReducer } = this.props;
    let arr = [];
    for (let i=0; i<MainReducer.currentCateData.length; i++) {
      arr.push(
        <View key={i} style={styles.view}>
          <TouchableHighlight 
            style={{borderRadius: 30}} 
            underlayColor={"rgba(200,200,200,1)"} 
            onPress={()=>this._onPress(i)}
          >
            <Image style={styles.icon} 
                   source={this.image(MainReducer.currentCateData[i].icon)}
            />
          </TouchableHighlight>
          <Text style={styles.text}>{ MainReducer.currentCateData[i].name }</Text>
        </View>
      )
    }
    return arr;
  }

  render() {
    const { MainReducer } = this.props;
    return (
      <View style={styles.container}>
        {/* 导航栏 */}
        <Navigation rightText={""}
                    rightClick={()=>this._back()}
                    rightText={"取消"}
                    rightStyle={{width: 0, height: 25}}
                    textView={
            <InExpe onPress={()=>this.refs.inExpeView.show()} title={MainReducer.currentInExIndex == 0 ? '支出' : '收入'}/>
        }/>
        {/* 列表 */}
        <ScrollView ref={"scroll"}
                    onScroll={(e)=>this._onScroll(e)}
                    scrollEventThrottle={16}>
          <View style={styles.subView}>
            {this.view()}
          </View>
        </ScrollView>
        {/* 键盘 */}
        <Keyboard ref={"keyboard"} day={this.state.day} onPressDay={()=>this._onPressDay()}/>
        {/* 时间选择 */}
        <DatePicker ref="datePicker" title={"选择日期"} onConfirm={(selectValue)=>this._onConfirm(selectValue)}/>
        {/* 收入/支出 */}
        <InExpeView ref={"inExpeView"} isShowNumber={MainReducer.currentInExIndex} top={64} onClick={(item)=>this._onInExClick(item)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subView: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: 'white',
  },
  view: {
    width: (ScreenWidth - 30) / 4,
    height: (ScreenWidth - 30) / 4 + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: (ScreenWidth - 30) / 4 / 3 * 2,
    height: (ScreenWidth - 30) / 4 / 3 * 2,
  },
  text: {
    marginTop: 5,
    fontWeight: '300',
    fontSize: 12,
    textAlign: 'center',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  BookkeepReducer: state.BookkeepReducer,
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  BookkeepAction: bindActionCreators(bookkeepAction, dispatch),
  MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Bookkeep);