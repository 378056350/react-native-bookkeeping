// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Alert, TouchableHighlight } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class About extends Component {

  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  care=()=>{
    Alert.alert(
      null,
      '请在微信右上角"添加朋友"中点击"公众号"\n搜索"鲨鱼记账",关注后互动',
      [
        {text: '好的', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigation 
          text={'高级功能'}
          leftIcon={require('../../assets/images/nav_back_n.png')}
          leftText={'返回'}
          leftClick={this._back}
        />
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image style={styles.imageIcon} source={require('../../assets/images/about.png')}/>
            <Text style={styles.imageText}>财务自由从鲨鱼笔记开始</Text>
          </View>
          <TouchableHighlight 
            style={styles.button} 
            underlayColor={"rgba(244,244,244,1)"} 
            onPress={this.care}
          >
            <View>
              <Text style={styles.buttonText}>关于自由从鲨鱼记账开始</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    width: ScreenWidth / 5 * 3,
    height: ScreenWidth / 5 * 3,
  },
  imageText: {
    marginTop: 10,
    color: 'rgba(100,100,100,1)',
    fontSize: 12,
    fontWeight: '200',
  },
  button: {
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#rgba(200,200,200,1)',
  },
  buttonText: {
    fontSize: 9,
    color: '#282828',
    fontWeight: '100',
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
export default connect(mapStateToProps, mapDispatchToProps)(About);