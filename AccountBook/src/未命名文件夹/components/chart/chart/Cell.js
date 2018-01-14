// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Cell extends Component {

  render() {
    return (
      <TouchableHighlight underlayColor={"rgba(244,244,244,1)"} onPress={()=>{}}>
        <View style={styles.container}>
          {/* 图片 */}
          <Image style={styles.icon}/>
          {/* 右侧 */}
          <View style={styles.right}>
            {/* 顶部 */}
            <View style={styles.top}>
              <Text style={styles.name}>{this.props.item.name}</Text>
              <Text style={styles.percent}>{this.props.item.percent * 100 + "%"}</Text>
              <Text style={styles.number}>{this.props.item.money}</Text>
            </View>
            {/* 底部 */}
            <View style={styles.bottom}>
              <View style={styles.progess}/>
            </View>
          </View>
          {/* 线条 */}
          <View style={styles.line}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 50, 
    alignItems: 'center',
    flexDirection: 'row',
  },
  // 图片
  icon: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
    marginLeft: 10,
  },
  // 右侧
  right: {
    flexDirection: 'column',
    height: 30,
    flex: 1,
    marginLeft: 10,
  },
  // 顶部
  top: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  name: {
    fontWeight: '300',
    color: '#282828',
    fontSize: 11,
  },
  percent: {
    fontWeight: '300',
    color: '#282828',
    fontSize: 10,
    flex: 1,
    marginLeft: 5,
  },
  number: {
    fontWeight: '300',
    color: '#282828',
    fontSize: 11,
    marginRight: 10,
  },
  // 底部
  bottom: {
    flex: 1,
  },
  progess: {
    backgroundColor: StreamColor,
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  // 线
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(244,244,244,1)',
    height: 0.5,
    width: ScreenWidth - 45
  },
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // nav: state.NavigationReducer,
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Cell);