// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Switch, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class MineCell extends Component {

  type() {
    if (this.props.item.section == 1 && (this.props.item.row == 2 || this.props.item.row == 3)) {
      return (
        <Switch style={styles.switch} onTintColor={StreamColor} onValueChange={this.props.onValueChange}/>
      )
    } else {
      return (
        <View style={styles.subview}>
          <Text style={styles.detail}>
            {this.props.item.detail}
          </Text>
          <Image style={styles.next} 
                 resizeMode="contain"
                 source={require('../../../assets/images/ad_arrow.png')}/>
        </View>
      )
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={()=>this.props.onClick(this.props.item)} underlayColor={'rgba(150,150,150,1)'}>
        <View style={styles.container}>
          <Image style={styles.icon} source={this.props.item.icon}/>
          <Text style={styles.text}>
            {this.props.item.text}
          </Text>
          {this.type()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 45,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 15
  },
  text: {
    marginLeft: 15,
    fontSize: 13,
    color: 'rgba(75,75,75,1)',
    flex: 1,
    fontWeight: '100'
  },
  subview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    color: 'rgba(150,150,150,1)',
    marginRight: 5,
    fontWeight: '300',
    fontSize: 11,
  },
  next: {
    width: 12,
    height: 12,
    marginRight: 15,
  },
  switch: {
    marginRight: 15,
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
export default connect(mapStateToProps, mapDispatchToProps)(MineCell);