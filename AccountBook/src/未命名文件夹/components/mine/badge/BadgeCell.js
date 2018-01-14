// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class BadgeCell extends Component {

  componentDidMount() {
    
  }

  views() {
    let arr = [];
    for (let i=0 ;i<this.props.item.data.length; i++) {
      arr.push(
        <TouchableOpacity key={i} activeOpacity={1} onPress={()=>this.props.onPress(this.props.item.data[i])}>
          <View key={i} style={styles.view}>
            <Image style={styles.icon} source={this.props.item.data[i].icon}/>
            <Text style={styles.text}>{this.props.item.data[i].text}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return arr;
  }

  render() {
    return (
        <View style={styles.container}>
          {this.views()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  view: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ScreenWidth / 3 - 30,
    height: ScreenWidth / 3 - 30,
  },
  text: {
    width: 80,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '300',
    color: 'rgba(50,50,50,1)',
    marginTop: 3,
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
export default connect(mapStateToProps, mapDispatchToProps)(BadgeCell);