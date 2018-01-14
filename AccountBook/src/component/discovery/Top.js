// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';
import { DateManager } from '../../common/index';

class Top extends Component {

  money() {
    let arr = [];
    let title = ['收入','支出','结余'];
    for (let i=0; i<3; i++) {
      let str;
      if (i == 0) {
        str = this.props.item.exmax;
      } else if (i == 1) {
        str = this.props.item.inmax;
      } else if (i == 2) {
        str = this.props.item.exmax - this.props.item.inmax;
      }
      arr.push(
        <View key={i} style={styles.money}>
          <Text style={styles.name}>{title[i]}</Text>
          <Text style={styles.detail}>{str}</Text>
        </View>
      )
    }
    return arr;
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor={'#eee'}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.bill}>账单</Text>
            <Image style={styles.icon} source={require('../../assets/images/ad_arrow.png')}/>
          </View>
          <View style={styles.bottom}>
            <View style={styles.left}>
              <Text style={styles.leftText}>{DateManager.getMonth()}</Text>
              <Text style={styles.leftDetail}>月</Text>
            </View>
            <View style={styles.line}/>
            {this.money()}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bill: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
  },
  icon: {
    width: 12,
    height: 12,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  leftText: {
    fontSize: 22,
    color: TitleColor,
    fontWeight: '300',
  },
  leftDetail: {
    fontSize: 12,
    color: TitleColor,
    marginBottom: 4,
    fontWeight: '300',
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#ddd',
    marginRight: 20,
  },
  money: {
    flex: 1,
  },
  name: {
    fontWeight: '300',
    color: '#111',
    fontSize: 10,
  },
  detail: {
    marginTop: 5,
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
  }
});

Top.defaultProps = {
  onPress: ()=>{}
}

Top.propTypes = {
  onPress: PropTypes.func.isRequired,
}


export default Top;