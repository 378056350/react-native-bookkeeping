// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Cell extends Component {

  render() {
    return (
      <TouchableHighlight underlayColor={"rgba(244,244,244,1)"} onPress={()=>this.props.onPress()}>
        <View style={styles.container}>
          <Image style={styles.icon}/>
          <Text style={styles.name}>旅行</Text>
          <Text style={styles.desc}>666</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    marginLeft: 10,
  },
  name: {
    fontSize: 9,
    color: '#282828',
    flex: 1,
    marginLeft: 5,
    fontWeight: '300',
  },
  desc: {
    fontSize: 9,
    color: '#282828',
    marginRight: 10,
    fontWeight: '300',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  nav: state.NavigationReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default Cell;
// export default connect(mapStateToProps, mapDispatchToProps)(Cell);