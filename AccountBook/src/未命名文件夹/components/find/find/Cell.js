// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Cell extends Component {

  bottomRight() {
    let arr = [];
    for (let i=0; i<3; i++) {
      arr.push(
        <View key={i} style={styles.bottomRightView}>
          <Text style={styles.bottomRightName}>收入</Text>
          <Text style={styles.bottomRightDesc}>0.00</Text>
        </View>
      )
    }
    return arr;
  }

  render() {
    return (
      <TouchableHighlight underlayColor={"rgba(200,200,200,1)"} onPress={(item)=>this.props.onPress(item)}>
        <View style={styles.container}>
          {/* 顶部 */}
          <View style={styles.top}>
            <Text style={styles.topText}>账单</Text>
            <Image style={styles.topIcon} resizeMode={"contain"} source={require('../../../assets/images/ad_arrow.png')}/>
          </View>
          {/* 底部 */}
          <View style={styles.bottom}>
            {/* 底部左侧 */}
            <View style={styles.bottomLeft}>
              <Text style={styles.bottomLeftName}>12</Text>
              <Text style={styles.bottomLeftDesc}>月</Text>
            </View>
            {/* 底部中间 */}
            <View style={styles.bottomCenter}/>
            {/* 底部右侧 */}
            <View style={styles.bottomRight}>
              {this.bottomRight()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: 'white',
  },
  // 顶部
  top: {
    width: ScreenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    fontSize: 11,
    color: 'rgba(100,100,100,1)',
    padding: 10,
  },
  topIcon: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  // 底部
  bottom: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  // 底部左侧
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    paddingTop: 0,
  },
  bottomLeftName: {
    fontSize: 18,
    fontWeight: '300',
  },
  bottomLeftDesc: {
    fontSize: 10,
    fontWeight: '300',
    marginBottom: 3,
    color: 'rgba(50,50,50,1)',
  },
  // 底部中间
  bottomCenter: {
    width: 0.5,
    height: 13,
    backgroundColor: 'gray',
    marginTop: 10,
  },
  // 底部右侧
  bottomRight: {
    flexDirection: 'row',
    flex: 1,
  },
  bottomRightView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 30,
  },
  bottomRightName: {
    fontSize: 9,
    color: 'rgba(100,100,100,1)',
    fontWeight: '300',
    paddingBottom: 8,
  },
  bottomRightDesc: {
    fontSize: 13,
    color: 'rgba(50,50,50,1)',
    fontWeight: '300',
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
export default connect(mapStateToProps, mapDispatchToProps)(Cell);