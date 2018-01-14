// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class HeaderText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detail: ["已连续打卡","记账总天数","记账总比数"],
    }
  }

  text() {
    let arr = [];
    for(let i=0; i<this.state.detail.length; i++) {
      arr.push(
        <View key={i} style={styles.subview}>
          <Text style={styles.text}>1</Text>
          <Text style={styles.detail}>{this.state.detail[i]}</Text>
        </View>
      )
    }
    return arr;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.text()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  subview: {
    flexDirection: 'column',
    width: ScreenWidth / 3,
  },
  text: {
    textAlign: 'center',
    color: 'rgba(75,75,75,1)',
    fontSize: 18,
  },
  detail: {
    marginTop: 5,
    textAlign: 'center',
    color: 'rgba(100,100,100,1)',
    fontSize: 12,
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
export default connect(mapStateToProps, mapDispatchToProps)(HeaderText);