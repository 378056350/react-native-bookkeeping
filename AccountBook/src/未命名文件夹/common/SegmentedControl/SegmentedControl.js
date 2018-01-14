

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../redux/action/mineAction';
// 控件
import { StreamColor } from '../../public/Public';

class SegmentedControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSelect: 0,
    }
  }

  componentWillMount() {
    if (this.props.current) {
      this.setState({
        currentSelect: this.props.current
      })
    }
  }
  

  _onPress(i) {
    this.setState({
      currentSelect: i,
    })
    if (this.props.onPress != undefined) {
      this.props.onPress(i);
    }
  }

  line(i) {
    if (i != this.props.title.length - 1) {
      return (
        <View key={i + this.props.title.length} style={[styles.line]}/>
      )
    }
  }
  // 普通样式
  buttonStyle(i) {
    if (i == 0) {
      return ({
      })
    } else if (i == this.props.title.length - 1) {
      return ({
      })
    } else {
      return ({
      })
    }
  }
  // 圆角
  buttonRadiusStyle(i) {
    if (i == 0) {
      return ({
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      })
    } else if (i == this.props.title.length - 1) {
      return ({
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4
      })
    }
  }
  // 文本
  buttonTextStyle(i) {
    if (i == this.state.currentSelect) {
      return ({
        color: StreamColor
      })
    } else {
      return ({
        color: '#282828'
      })
    }
  }
  // 选中
  buttonSelectStyle(i) {
    if (i == this.state.currentSelect) {
      return ({
        backgroundColor: '#282828'
      })
    } else {
      return ({
        backgroundColor: StreamColor
      })
    }
  }
  button() {
    let arr = [];
    for (let i=0; i<this.props.title.length; i++) {
      arr.push (
        <TouchableHighlight key={i} style={[{flex: 1},this.buttonRadiusStyle(i)]} onPress={()=>this._onPress(i)}>
          <View style={[styles.button, this.buttonStyle(i), this.buttonRadiusStyle(i), this.buttonSelectStyle(i)]}>
            <Text style={[styles.buttonText, this.buttonTextStyle(i)]}>
              {this.props.title[i]}
            </Text>
          </View>
        </TouchableHighlight>
      )
      arr.push (
        this.line(i)
      )
    }
    return arr;
  }
  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        {this.button()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#282828',
    justifyContent: 'flex-start'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StreamColor,
  },
  buttonText: {
    fontSize: 13, 
    fontWeight: '300',
  },
  line: {
    width: 1,
    backgroundColor: '#282828',
  }
});


// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MineAction: bindActionCreators(mineAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(SegmentedControl);