// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import Header from '../../components/details/item/Header';
import Table from '../../components/details/item/Table';
import EditButton from '../../common/EditButton/EditButton';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Item extends Component {
  
  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Navigation text=""
                    rightText={""}
                    leftText={"返回"}
                    leftIcon={require('../../assets/images/nav_back_n.png')}
                    leftClick={()=>this._back()}
                    rightText={"分享"}
                    rightStyle={{width: 0, height: 25}}/>
        <Header/>
        <Table style={{marginTop: 54, backgroundColor: 'red'}}/>
        <EditButton/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
export default connect(mapStateToProps, mapDispatchToProps)(Item);