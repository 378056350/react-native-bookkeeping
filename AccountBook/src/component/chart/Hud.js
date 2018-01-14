// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// Utils
import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop,
  TSpan
} from 'react-native-svg';
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor, TitleColor } from '../../utils/index';

class Hud extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offsetX: 0,
      lineOffsetX: 0,
      opacity: 0
    }
  }
  show() {
    this.setState({
      opacity: 1
    })
  }
  hide() {
    this.setState({
      opacity: 0
    })
  }
  data() {
    if (this.props.data.length != 0) {
      return (
        <View key={0} style={styles.none}>
          <Text style={styles.noneText}>没有消费</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.has}>
          <View style={styles.hasText}><Text style={styles.hasTextT}>前三笔交易</Text></View>
          {this.cell()}
        </View>
      )
    }
  }
  cell() {
    let arr = [];
    for (let i=0; i<3; i++) {
      arr.push(<Cell key={i}/>)
    }
    return arr;
  }
  setHudWithOffsetX(offsetX, lineOffsetX) {
    this.setState({
      offsetX: offsetX,
      lineOffsetX: lineOffsetX
    })
  }
  render() {
    let x = ((ScreenWidth / 2 - 10) / 2 - this.state.lineOffsetX)-2;
    let triangle = x + ',0 ' + (x + 13) + ',0 ' + (x + 6.5) + ',7'
    return (
      <View 
        pointerEvents={'none'}
        style={[styles.container, {
          left: this.state.offsetX,
          opacity: this.state.opacity,
          top: 50,
        }]}
      >
        <View style={styles.hud}>
          {this.data()}
        </View>
        <Svg
          width={ScreenWidth+""}
          height={"7"}
          fill={'#000'}
        >
          <Polygon
            points={triangle}
            fill={TitleColor}
            stroke={TitleColor}
            strokeWidth="1"
          />
        </Svg>
        <View style={[styles.line,{
          left: (ScreenWidth / 2 - 2) / 2 - this.state.lineOffsetX + 0.5
        }]}/>
      </View>
    );
  }
}
class Cell extends Component {

  render() {
    return (
      <View style={styles.cell} pointerEvents={'none'}>
        <Image style={styles.icon}/>
        <Text style={styles.time}>17/12/30</Text>
        <Text style={styles.name}>购物</Text>
        <Text style={styles.money}>12</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  hud: {
    width: ScreenWidth / 2,
    backgroundColor: TitleColor,
    borderRadius: 5,
  },
  none: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noneText: {
    color: 'white',
  },
  triangle: {
    width: 10,
    height: 10,
    backgroundColor: TitleColor,
    position: 'relative',
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: TitleColor,
  },
  has: {
    padding: 10,
    paddingLeft: 7,
    paddingRight: 7,
  },
  hasText: {
    backgroundColor: '#444',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hasTextT: {
    color: 'white',
    fontSize: 13,
  },
  // cell
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
  },
  time: {
    fontWeight: '300',
    color: 'white',
    fontSize: 11,
  },
  name: {
    fontWeight: '300',
    color: 'white',
    fontSize: 11,
  },
  money: {
    fontWeight: '300',
    color: 'white',
    fontSize: 11,
  }
});

Hud.defaultProps = {
  data: [],
  onPress: ()=>{}
}
Hud.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
}


export default Hud;