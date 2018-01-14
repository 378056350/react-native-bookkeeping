// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { 
  ScreenWidth, 
  ScreenHeight, 
  StreamColor, 
  TitleColor, 
  BackDefaultColor,
} from '../../utils/index';

class Cell extends Component {

  title() {
    return (
      <View style={styles.top}>
        <Text style={styles.title}>累计记账笔数</Text>
        <Text style={styles.detail}>已获取0枚</Text>
      </View>
    )
  }
  badge() {
    let arr = [];
    for (let i=0; i<this.props.item.data.length; i++) {
      arr.push (
        <Badge 
          key={i} 
          item={this.props.item.data[i]} 
          onPress={()=>this.props.onPress(this.props.item.data[i])}
        />
      )
    }
    return (
      <View style={styles.bottom}>
        {arr}
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.title()}
        {this.badge()}
      </View>
    );
  }

}
class Badge extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={1}>
        <View style={styles.badge}>
          <Image style={styles.icon} source={this.props.item.icon}/>
          <Text style={styles.name}>{this.props.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // 全局
  container: {
    backgroundColor: 'white',
  },
  // 顶部
  top: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '300',
    color: '#666',
  },
  detail: {
    fontSize: 11,
    fontWeight: '300',
    color: '#bbb',
    paddingLeft: 10,
  },
  // 底部
  bottom: {
    width: ScreenWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  badge: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3 + 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ScreenWidth / 3 - 30,
    height: ScreenWidth / 3 - 30,
  },
  name: {
    fontSize: 11,
    fontWeight: '300',
    color: '#bbb',
    textAlign: 'center',
    marginTop: 3,
  },
});

Cell.defaultProps = {
  item: {
    name: '',
    data: [],
  },
  onPress: ()=>{}
}
Cell.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    data:  PropTypes.array,
  }),
  onPress: PropTypes.func,
}

Badge.defaultProps = {
  item: {
    name: '',
    icon: 0,
    iconS: 0,
  },
  onPress: ()=>{}
}
Badge.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    icon:  PropTypes.number,
    iconS:  PropTypes.number,
  }),
  onPress: PropTypes.func,
}

export default Cell;