// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, PanResponder, TouchableOpacity, Animated, Easing } from 'react-native';
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
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';
import Save from '../../common/SaveManager/Save';

class ChartHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSelect: -1,
    }
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // 手势开始
      onPanResponderGrant: (evt, gestureState) => {
        // this.drawHudWithLeft(gestureState.x0);
        this.onPanMove(gestureState.x0)
      },
      // 手势移动
      onPanResponderMove: (evt, gestureState) => {
        // this.drawHudWithLeft(gestureState.moveX);
        // console.log('手势移动');
        this.onPanMove(gestureState.moveX)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // 手势结束
      onPanResponderRelease: (evt, gestureState) => {
        this.onPanStop();
      },
      // 手势终止
      onPanResponderTerminate: (evt, gestureState) => {
        this.onPanStop();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }
  getCount() {
    if (this.props.enum == 0) {
      return 7;
    } else if (this.props.enum == 1) {
      return 30;
    } else if (this.props.enum == 2) {
      return 12;
    }
  }
  onPanMove=(offsetX)=>{
    let count = this.getCount();
    var currentSelect = 0;
    if (offsetX < 10) {
      currentSelect = 0;
    } else if (offsetX > (ScreenWidth - 10)) {
      currentSelect = count - 1;
    } else {
      offsetX = offsetX - 10;
      var padding = (ScreenWidth - 20) / (count - 1);
      var qujian = (offsetX + padding * 0.4) / padding;
      currentSelect = parseInt(qujian);
    }
    if (this.state.currentSelect != currentSelect) {
      this.setState({
        currentSelect: currentSelect
      })
      this.props.onChangeIndex(currentSelect);
    }
  }
  onPanStop=()=>{
    this.setState({
      currentSelect: -1
    })
    this.props.onChangeEnd()
  }
  // 默认两条线
  defaultLine() {
    let arr = [];
    arr.push(
      <Line
        key={0}
        x1="10"
        y1="5"
        x2={ScreenWidth-10+""}
        y2="5"
        stroke={'#ddd'}
        strokeWidth="1"
      />
    )
    arr.push(
      <Line
        key={2}
        x1="10"
        y1="95"
        x2={ScreenWidth-10+""}
        y2="95"
        stroke={'#ddd'}
        strokeWidth="1"
      />
    )    
    return arr;
  }
  // 原点
  circle() {
    let arr = [];
    let count = this.getCount();
    var padding = (ScreenWidth-12 * 2) / (count-1);
    for (let i=0; i<count; i++) {
      var data = this.props.data.data[i];
      var value = 95;
      if (data != undefined) {
        if (i == 11) {
          console.log(this.props.data);
        }
        value = 90 - 90.0 / this.props.data.max * data.value + 5;
      }
      var color = value == 95 ? 'white' : StreamColor;
      arr.push(
        <Circle
          key={i}
          cx={10+2+i*padding+""}
          cy={value+""}
          r="2.5"
          fill={color}
          stroke={'#ccc'}
          strokeWidth="0.5"
        />
      )
    }
    return arr;
  }
  // 文本
  text() {
    let arr = [];
    let count = this.getCount();
    let week = ['一','二','三','四','五','六','日'];
    for (let i=0; i<count; i++) {
      if (this.props.enum == 0) {
        var padding = (ScreenWidth-123 * 2) / (count-1);
        var style = [styles.bottomText,{left: i*padding, width: 35}];
        arr.push(
          <Text key={i} style={style}>{'周'+week[i]}</Text>
        )
      } else if (this.props.enum == 1) {
        var padding = (ScreenWidth-185 * 2) / (count-1);
        var style = [styles.bottomText,{left: 6+i*padding, width: 12}];
        if ((i + 1) % 5 == 0 || i == 0 || i == count - 1) {
          arr.push(
            <Text key={i} style={style}>{i+1}</Text>
          )
        } else {
          arr.push(
            <Text key={i} style={style}></Text>
          )
        }
      } else if (this.props.enum == 2) {
        var padding = (ScreenWidth-125 * 2) / (count-1);
        var style = [styles.bottomText,{left: 5+i*padding, width: 20}];
        if (i == 0 || (i + 1) % 3 == 0) {
          arr.push(
            <Text key={i} style={style}>{i+1+"月"}</Text>
          )
        } else {
          arr.push(
            <Text key={i} style={style}></Text>
          )
        }
      }
    }
    return arr;
  }
  // 折线
  polyline() {
    var str = '';
    let count = this.getCount();
    let padding = (ScreenWidth-12 * 2) / (count-1);
    for (let i=0; i<count; i++) {
      var value = 95;
      var data = this.props.data.data[i];
      if (data != undefined) {
        value = 90 - 90.0 / this.props.data.max * data.value + 5;
      }
      str = str + (10 + i * padding + 2)+","+value;
      if (i != count - 1) {
        str = str + ' ';
      }
    }
    return (
      <Polyline
        points={str}
        fill="none"
        stroke={'#bbb'}
        strokeWidth="1"
      />
    )
  }
  render() {
    return (
      <View 
        style={styles.container}
        {...this._panResponder.panHandlers}
        onResponderTerminationRequest={()=>false}
      >
      
        <Text style={styles.name}>总{this.props.inEx == 0 ? '支出' : '收入'}: {Save.toDecimal2(this.props.data.sum)}</Text>
        <Text style={styles.detail}>平均值: {Save.toDecimal2(this.props.data.avg)}</Text>
        <Svg
          width={ScreenWidth+""}
          height={"100"}
          fill={'#000'}
        >
          {this.defaultLine()}
          {this.polyline()}
          {this.circle()}
        </Svg>
        <View style={styles.bottom}>
          {this.text()}
        </View>
        <Text style={styles.inEx}>{this.props.inEx == 0 ? '支出' : '收入'}排行榜</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: 'white',
  },
  hud: {
    position: 'absolute',
    top: -100,
    width: 200,
    height: 50,
    backgroundColor: 'red',
  },
  name: {
    fontWeight: '300',
    fontSize: 10,
    color: TitleColor,
    marginLeft: 10,
    marginTop: 5,
  },
  detail: {
    fontWeight: '300',
    fontSize: 9,
    color: TitleColor,
    marginLeft: 10,
    marginTop: 3,
    marginBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
    position: 'relative',
    // justifyContent: 'space-between',
    marginTop: 3,
    paddingBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  bottomText: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
    fontWeight: '300',
    // marginLeft: 10,
    // marginRight: 10,
  },
  inEx: {
    marginTop: 10,
    fontWeight: '300',
    fontSize: 11,
    color: TitleColor,
    marginLeft: 10,
    paddingBottom: 15,
  },
});

ChartHeader.defaultProps = {
  onChangeIndex: ()=>{},
  onChangeEnd: ()=>{},
  enum: 0,
}
ChartHeader.propTypes = {
  onChangeIndex: PropTypes.func.isRequired,
  onChangeEnd: PropTypes.func.isRequired,
  enum: PropTypes.number.isRequired,
}

export default ChartHeader;