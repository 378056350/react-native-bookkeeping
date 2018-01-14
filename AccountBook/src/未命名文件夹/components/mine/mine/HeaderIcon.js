// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class HeaderIcon extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={require('../../../assets/images/default_header.png')}/>
        <Text style={styles.text}>郑业强</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    marginTop: 5,
    fontSize: 13,
    color: 'rgba(50,50,50,1)'
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
export default connect(mapStateToProps, mapDispatchToProps)(HeaderIcon);