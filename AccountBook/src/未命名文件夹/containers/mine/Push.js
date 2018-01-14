// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableHighlight, ListView, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import PushTable from '../../components/mine/push/PushTable';
import AddButton from '../../common/AddButton/AddButton';
import DatePicker from '../../common/DatePicker/DatePicker';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';


class Push extends Component {


  _add() {
    this.refs.datePicker.show(0);
  }

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation text="定时提醒"
                     rightText={""}
                     leftText={"返回"}
                     leftIcon={require('../../assets/images/nav_back_n.png')}
                     leftClick={()=>this._back()}/>
        
        <PushTable/>
        <AddButton text="特别提醒"
                   onPress={()=>this._add()}/>
        <DatePicker ref="datePicker"
                    title={"选择时间"}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'rgba(233,233,233,1)',
	},
  add: {
    width: ScreenWidth,
    height: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'rgba(50,50,50,1)',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Push);