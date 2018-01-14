// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, ScrollView, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import chartAction from '../../../redux/action/chartAction';
import mainAction from '../../../redux/action/mainAction';
// Manager
import DateManager from '../../../common/DateManager/DateManager';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class TimeHeader extends Component {

  componentWillReceiveProps(nextProps) {
    let NMainReducer = nextProps.MainReducer;
    if (this.props.MainReducer.currentDateRangeIndex !=  
      NMainReducer.currentDateRangeIndex) {
      this.scrollTo(NMainReducer);
    }
  }
  componentDidMount() {
    const { MainReducer } = this.props;
    this.scrollTo(MainReducer);
  }
  scrollTo(MainReducer) {
    // 截图分享
    var offsetX = (MainReducer.currentSubDateValue[MainReducer.currentDateRangeIndex].index + 1) * 70;
    if (offsetX < ScreenWidth) {
      offsetX = 0;
    } else {
      offsetX = offsetX - ScreenWidth;
    }
    this.refs.scroll.scrollTo({
      x: offsetX,
      y: 0, 
      animated: false
    });
  }
  

  // 点击时间
  changeDisplay(i) {
    const { MainAction, MainReducer } = this.props;
    // var data = MainReducer.currentSubDateValue;
    // data[MainReducer.currentDateRangeIndex].index = i;
    // MainAction.changeSubDataRangeAction(data);

    MainAction.changeDataRangeSaga (
      MainReducer.currentDateRangeIndex, 
      i, 
      MainReducer.currentSubDateValue, 
      MainReducer.currentSubDateRange
    );
  
  }

  view() {
    const { MainReducer } = this.props;
    let data = MainReducer.currentSubDateRange[0][MainReducer.currentDateRangeIndex];
    let arr = [];
    for (let i=0; i<data.length; i++) {
      let style = [styles.text];
      if (i == MainReducer.currentSubDateValue[MainReducer.currentDateRangeIndex].index) {
        style.push(styles.textSelect);
      }
      arr.push (
        <TouchableOpacity key={i} style={styles.view} activeOpacity={0.8} onPress={()=>this.changeDisplay(i)}>
          <View>
            {/* <Text style={style}>{data[i]}</Text> */}
            <Text style={style}>{data[i]}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return arr;
  }

  render() {
    const { MainReducer } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView ref='scroll'
                    style={styles.scroll} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
          {this.view()}
          <View style={[styles.line,{
            left: 10 + MainReducer.currentSubDateValue[MainReducer.currentDateRangeIndex].index * 70,
          }]}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: 34,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(200,200,200,1)',
  },
  scroll: {
    flex: 1,
  },
  view: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(170,170,170,1)',
    fontWeight: '300',
    fontSize: 12,
    textAlign: 'center',
  },
  textSelect: {
    fontSize: 14,
    color: '#282828',
    fontWeight: '300',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    width: 50,
    height: 1.5,
    backgroundColor: '#282828',
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
export default connect(mapStateToProps, mapDispatchToProps)(TimeHeader);