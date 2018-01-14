// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 数据
import SaveManager from '../../../common/StorageManager/SaveManager';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Cell extends Component {

  icon() {
    if (this.props.item.section == 0) {
      return require('../../../assets/images/category_delete.png')
    } else {
      return require('../../../assets/images/category_add.png')
    }
  }

  change() {
    if (this.props.item.section == 0) {
      return (
        <Image style={styles.change} 
               resizeMode={"contain"} 
               source={require('../../../assets/images/guide_sort.png')}/>
      )
    }
  }

  image() {
    return SaveManager.getIconWithId(this.props.item.icon, 0)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.delete} source={this.icon()}/>
        <Image style={styles.icon} source={this.image()}/>
        <Text style={styles.text}>{this.props.item.text}</Text>
        {this.change()}
      </View>
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
  delete: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  icon: {
    marginLeft: 10,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderColor: 'rgba(244,244,244,1)',
    borderWidth: 1,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontWeight: '300',
    color: '#282828',
    fontSize: 11,
  },
  change: {
    marginRight: 10,
    width: 36,
    height: 24,
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
export default connect(mapStateToProps, mapDispatchToProps)(Cell);