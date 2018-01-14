// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class SectionHeader extends Component {

  view() {
    let title = ["月份","收入","支出","结余"];
    let arr = [];
    for(let i=0; i<4; i++) {
      arr.push(
        <View key={i} style={styles.view}>
          <Text style={styles.text}>{title[i]}</Text>
        </View>
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
    width: ScreenWidth, 
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomColor: 'rgba(233,233,233,1)',
    borderBottomWidth: 0.5,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 7,
    paddingBottom: 7,
  },
  text: {
    fontSize: 10,
    color: 'rgba(150,150,150,1)',
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
export default connect(mapStateToProps, mapDispatchToProps)(SectionHeader);