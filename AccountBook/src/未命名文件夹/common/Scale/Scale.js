

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ART,
  PanResponder
} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import chartAction from '../../redux/action/chartAction';
import mainAction from '../../redux/action/mainAction';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';
import DateManager from '../DateManager/DateManager';
const {Surface, Shape, Text, Path,Group} = ART;
// 点半径
const [ pointRadius ] = [2.5]
// 绘制宽 点宽 绘制高
const [ drawW, pointW, drawH ] = [ScreenWidth - 30, ScreenWidth - 30 - pointRadius * 2, ScreenWidth / 5 * 2];
// 顶部线 底部线 0 平均线
const [ top, bottom, zero, avg ] = [5, drawH- 5, (drawH - 20) / 7 * 6, (drawH - 20) / 7 * 6 - 20,]

class Scale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pointCount: 7,
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
        this.drawHudWithLeft(gestureState.x0);
      },
      // 手势移动
      onPanResponderMove: (evt, gestureState) => {
        this.drawHudWithLeft(gestureState.moveX);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // 手势结束
      onPanResponderRelease: (evt, gestureState) => {
        const { ChartAction } = this.props;
        ChartAction.hideChartHudAction();
      },
      // 手势终止
      onPanResponderTerminate: (evt, gestureState) => {
        const { ChartAction } = this.props;
        ChartAction.hideChartHudAction();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }
  componentDidMount() {
    const { MainReducer } = this.props;
    this.refreshPoint(MainReducer);
  }
  componentWillReceiveProps(nextProps) {
    // 截图分享
    if (this.props.MainReducer.currentDateRangeIndex !=
        nextProps.MainReducer.currentDateRangeIndex) {
        this.refreshPoint(nextProps.MainReducer);
    }
  }
  refreshPoint(MainReducer) {
    if (MainReducer.currentDateRangeIndex == 0) {
      this.setState({
        pointCount: 7
      })
    } else if (MainReducer.currentDateRangeIndex == 1) {
      this.setState({
        pointCount: 30
      })
    } else if (MainReducer.currentDateRangeIndex == 2) {
      this.setState({
        pointCount: 12
      })
    }
  }
  

  drawHudWithLeft(left) {
    if (left < 15) {
      left = 15;
    } else if (left > (ScreenWidth - 15)) {
      left = ScreenWidth - 15;
    }
    left = left - 15;
    const { ChartReducer, ChartAction } = this.props;
    const paddingX = drawW / (this.state.pointCount - 1);
    const current = Math.round(left / paddingX);
    ChartAction.showChartHudAction(ChartReducer.chartPointCenters[0][current] + 15,
                                   ChartReducer.chartPointCenters[1][current] + 35,
                                   current);
  }


  // 初始化
  initialization () {
    const path1 = ART.Path();
    const path2 = ART.Path();
    // 顶部线
    path1.moveTo(0, top);  
    path1.lineTo(drawW, top); 
    // 0
    path1.moveTo(0, zero);  
    path1.lineTo(drawW, zero); 
    // 底部线
    path1.moveTo(0, bottom); 
    path1.lineTo(drawW, bottom);
    // avg
    path2.moveTo(0, avg);  
    path2.lineTo(drawW, avg); 
    return {path1, path2};
  }

  // 线条
  line() {
    const { ChartReducer, MainReducer } = this.props;
    const line = ART.Path();
    for (let i=1; i<=this.state.pointCount; i++) {
      if (MainReducer.currentDateRangeIndex == 0) {
        if (i == 1) {
          line.moveTo(pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius, zero);
        } else {
          line.lineTo(pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius, zero);
        }
      } else if (MainReducer.currentDateRangeIndex == 1) {
        let date = 0;
        for (y in MainReducer.currentData.dateData) {
          if (i == DateManager.getDateWithGang(y, 2)) {
            date = (zero - top) / MainReducer.currentData.max * MainReducer.currentData.dateData[y];
          }
        }
        if (i == 1) {
          line.moveTo(pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius, zero - date);
        } else {
          line.lineTo(pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius, zero - date);
        }
      } else if (MainReducer.currentDateRangeIndex == 2) {
        if (i == 1) {
          line.moveTo(pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius, zero);
        } else {
          line.lineTo(pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius, zero);
        }
      } 
    }  
    return line;
  }

  // 原点
  circle() {
    const { ChartAction, ChartReducer, MainReducer } = this.props;
    let arrX = [];
    let arrY = [];
    let line = [];
    for (let i=1; i<=this.state.pointCount; i++) {
      const path = new Path();
      if (MainReducer.currentDateRangeIndex == 0) {
        let date = 0;
        var padding = i == 1 ? 1 : (i != this.state.pointCount ? 0 : -1);
        let pointX = pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius + padding;
        var pointY = zero - pointRadius - date;
        arrX.push(pointX);
        arrY.push(pointY);
        path.moveTo(pointX, pointY).arc(0, 5, pointRadius).arc(0, -5, pointRadius).close();
        line.push (
          <Shape key={i} d={path} stroke="#282828" strokeWidth={0.3} fill={'white'}/>
        )
      } 
      else if (MainReducer.currentDateRangeIndex == 1) {
        let date = 0;
        for (y in MainReducer.currentData.dateData) {
          if (i == DateManager.getDateWithGang(y, 2)) {
            date = (zero - top) / MainReducer.currentData.max * MainReducer.currentData.dateData[y];
          }
        }
        var padding = i == 1 ? 1 : (i != this.state.pointCount ? 0 : -1);
        var fill = date == 0 ? 'white' : StreamColor;
        let pointX = pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius + padding;
        var pointY = zero - pointRadius - date;
        arrX.push(pointX);
        arrY.push(pointY);
        path.moveTo(pointX, pointY).arc(0, 5, pointRadius).arc(0, -5, pointRadius).close();
        line.push (
          <Shape key={i} d={path} stroke={"#282828"} strokeWidth={0.3} fill={fill}/>
        )
      } 
      else if (MainReducer.currentDateRangeIndex == 2) {
        let date = 0;
        var padding = i == 1 ? 1 : (i != this.state.pointCount ? 0 : -1);
        let pointX = pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius + padding;
        var pointY = zero - pointRadius - date;
        arrX.push(pointX);
        arrY.push(pointY);
        path.moveTo(pointX, pointY).arc(0, 5, pointRadius).arc(0, -5, pointRadius).close();
        line.push (
          <Shape key={i} d={path} stroke="#282828" strokeWidth={0.3} fill={'white'}/>
        )
      }
    }
    // 线条
    // 存储值
    let arr = [arrX, arrY];
    if (arr.toString() != ChartReducer.chartPointCenters.toString()) {
      ChartAction.setChartPointAction(arr)
    }
    return line;
  }

  // 选中点
  currentPoint() {
    const { ChartReducer, MainReducer } = this.props;
    const current = ChartReducer.currentChartPoint;
    const isShowChartHud = ChartReducer.isShowChartHud;
    if (isShowChartHud == true && ChartReducer.chartPointCenters.length != 0) {
      const path = new Path();
      path.moveTo(ChartReducer.chartPointCenters[0][current], 
                  ChartReducer.chartPointCenters[1][current])
          .arc(0, 5, pointRadius).arc(0, -5, pointRadius).close();
      return (
        <Shape d={path} stroke="#282828" strokeWidth={0.3} fill={'#282828'}/>
      )
    } 
  }



  // 文本
  text() {
    const { ChartReducer, MainReducer } = this.props;
    let arr = [];
    for (let i=1; i<=this.state.pointCount; i++) {
      let alignment = i == 1 ? 'left' : i == this.state.pointCount ? 'right' : 'center';
      var isShow = false;
      var text = '';
      if (MainReducer.currentDateRangeIndex == 0) {
        isShow = true;
        text = DateManager.getDateWithWeek(
          DateManager.getYear(new Date()), 
          MainReducer.currentSubDateRange[1][0][0].week - 1
        )[i-1];
      } else if (MainReducer.currentDateRangeIndex == 1 && 
                (i == 1 || (i % 5 == 0 && i != 30) || i == this.state.pointCount)) {
        isShow = true;
        text = i + '';
      } else if (MainReducer.currentDateRangeIndex == 2 && (i % 3 == 0 || i == 1)) {
        isShow = true;
        text = i + '月';
      }
      if (isShow == true) {
        arr.push(
          <Text fill = "#282828"
                key={i}
                y={zero + 5}
                x={pointW / (this.state.pointCount - 1) * (i - 1) + pointRadius}
                alignment={alignment}
                font = {{
                  fontFamily: 'Helvetica, Neue Helvetica, Arial',
                  fontSize: 9,
                  fontWeight: '100',
                  fontStyle: "normal" 
                }}
          >
            {text}
          </Text>
        )
      }
    }
    return arr;
  }
  
  render() {
    const {path1, path2} = this.initialization();
    const pathText = new Path();
    return (
      <View 
        style={styles.container} 
        {...this._panResponder.panHandlers}
        onResponderTerminationRequest={()=>false}
      >
        <Surface width={drawW} height={drawH * 2}>
          <Shape d={path1} stroke="#282828" strokeWidth={0.05} />
          <Shape d={path2} stroke="#282828" strokeWidth={0.05} strokeDash={[5,5]}/>
          <Shape d={this.line()} stroke="#282828" strokeWidth={0.4} />
          {this.circle()}
          {this.currentPoint()}
          {this.text()}
        </Surface>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenWidth / 5 * 2,
    // paddingLeft: 15,
  },
});


// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  ChartReducer: state.ChartReducer,
  MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  ChartAction: bindActionCreators(chartAction, dispatch),
  MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Scale);