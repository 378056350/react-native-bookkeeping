// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import Table from '../../components/find/bill/Table';
import DatePicker from '../../common/DatePicker/DatePicker';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Bills extends Component {

  _back() {
    this.refs.datePicker.hide();
    const { goBack } = this.props.navigation;
    goBack();
  }

  _rightClick() {
    if (this.refs.datePicker.getIsShow() == false) {
      this.refs.datePicker.show(1);
    } else {
      this.refs.datePicker.hide();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgTop}/>
        <View style={styles.bgBottom}/>
        <Navigation text="账单"
                    rightText={""}
                    leftText={"返回"}
                    leftIcon={require('../../assets/images/nav_back_n.png')}
                    leftClick={()=>this._back()}
                    rightText={"2017年"}
                    rightIcon={require('../../assets/images/time_down.png')}
                    rightStyle={{width: 13, height: 13}}
                    rightClick={()=>this._rightClick()}/>
        <Table/>
        <DatePicker ref="datePicker"
                    title={"选择年份"}
                    top={64}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  },
  bgTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: ScreenHeight / 2,
    backgroundColor: StreamColor
  },
  bgBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: ScreenHeight / 2,
    backgroundColor: 'rgba(244,244,244,1)',
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
export default connect(mapStateToProps, mapDispatchToProps)(Bills);