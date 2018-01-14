

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Easing,
  TouchableHighlight
} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import chartAction from '../../redux/action/chartAction';
import mainAction from '../../redux/action/mainAction';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor, NavigationTitle} from '../../public/Public';

class Cell extends Component {

  render() {
    const { MainReducer } = this.props;
    return (
      <TouchableHighlight underlayColor={"rgba(222,222,222,1)"} onPress={()=>this.props.onPress(this.props.item)}>
        <View style={styles.container}>
          <Image style={styles.icon} resizeMode={"contain"} source={this.props.item.icon}/>
          <Text style={styles.text}>{this.props.item.title}</Text>
          <Image style={[styles.right, {
              opacity: this.props.isShow == true ? 0.5 : 0
            }]} source={require('../../assets/images/tally_select_right.png')}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
    width: 15,
    height: 15,
  },
  text: {
    marginLeft: 10,
    fontWeight: '300',
    fontSize: 13,
    color: '#282828',
    flex: 1,
  },
  right: {
    marginRight: 10,
    width: 15,
    height: 15,
  }
});


// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Cell);