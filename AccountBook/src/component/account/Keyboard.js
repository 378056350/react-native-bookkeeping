// 控件
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Image, Animated, Easing, SectionList, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// 控件
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Keyboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      key: ["7","8","9","今天",
            "4","5","6","+",
            "1","2","3","-",
            ".","0","删除","完成"],
      opacity: new Animated.Value(1),
      timeAnim: 300,
      // 金额
      money: "0",
      // 最后一个字符串
      lastMoney: "0",
      // 是否在加减
      isArithmetic: false,
      // 是否有小数点
      isPoint: [0, 0],
      // 第几个数字
      isMathNumber: 1,
      // 两个数字
      math: [0, 0]
    }
  }
  //======================== 动画 ========================//
  // 显示
  show() {
    Animated.timing(this.state.opacity,{ 
      duration: this.state.timeAnim,
      easing: Easing.elastic(0),
      toValue: 0
    }).start((result)=>{
      
    });
  }
  // 隐藏
  hide() {
    Animated.timing(this.state.opacity,{ 
      duration: this.state.timeAnim,
      easing: Easing.elastic(0),
      toValue: 1
    }).start((result)=>{
      
    });
  }

  //======================== 数据 ========================//
  getMoney() {
    return this.state.money;
  }
  getRemark() {
    return this.state.text;
  }
  
  //======================== 按键 ========================//
  // =/完成 切换
  setKeyArr(str) {
    const { key } = this.state;
    key[15] = str;
    return key;
  }
  // 小数点判断
  setPointArr(str) {
    var pointArr;
    var hasPoint = str.indexOf(".");
    if (hasPoint >= 0) {
      pointArr = [1, 0];
    } else {
      pointArr = [0, 0];
    }
    return pointArr;
  }
  // 截取2位小数
  setMath(str) {
    var moneyNumber = parseFloat(str);
    moneyNumber = parseInt(moneyNumber * 100);
    moneyNumber = moneyNumber / 100;
    moneyNumber = moneyNumber + "";
    return moneyNumber;
  }
  // 点击
  onKey(index) {
    var str;
    var { key, money, lastMoney, isMathNumber, math, isPoint } = this.state;
    // 数字
    if ((index >=0 && index <= 2) || 
        (index >=4 && index <= 6) ||
        (index >=8 && index <= 10) ||
        index == 13) {
      // 内容判断
      // 7-9
      if (index >=0 && index <= 2) {
        str = index + 7;
      } 
      // 4-6
      else if (index >=4 && index <= 6) {
        str = index;
      }
      // 1-3
      else if (index >=8 && index <= 10) {
        str = index - 7;
      }
      // 0
      else if (index == 13) {
        str = 0;
      }

      // 判断
      // 0
      if (money == 0) {
        money = str;
        lastMoney = str;
      } 
      // 加减号
      else if (lastMoney == "+" || lastMoney == "-") {
        // 赋值
        money = money + "" + str;
        lastMoney = str;
        // "完成"改"="
        key = this.setKeyArr("=");
        // 第二个数字
        isMathNumber = 2;
      }
      // 其余
      else {
        money = money + "" + str;
        lastMoney = str;
      }

      // 小数点判断
      money = money + "";
      if (money.indexOf("+") == -1 && money.indexOf("-") == -1) {
        money = this.setMath(money);
      }
      if (money.indexOf("+") != -1 || money.indexOf("-") != -1) {
        var moneyNumber;
        var second;
        var first;
        if (money.indexOf("+") != -1) {
          index  = money.indexOf("+");
          first  = money.substring(0, index + 1);
          second = money.substring(index + 1);
          second = this.setMath(second);
          money  = first + "" + second;
        } else if (money.indexOf("-") != -1) {
          index  = money.indexOf("-");
          first  = money.substring(0, index + 1);
          second = money.substring(index + 1);
          second = this.setMath(second);
          money  = first + "" + second;
        } 
      }
    }
    // 加减
    else if (index == 7 || index == 11) {
      // +
      if (index == 7) {
        str = "+";
      }
      // -
      else if (index == 11) {
        str = "-";
      }

      // 判断
      // 0
      if (money == "0") {
        money = money;
      } 
      // 加减号
      else if (lastMoney == "+" || lastMoney == "-") {
        lastMoney = str;
        var moneyArr = this.state.money.split("");
        moneyArr = moneyArr.slice(0, -1);
        money = moneyArr.join("");
        money = money + "" + str;
      }
      // 数字,点
      else {
        if (isMathNumber == 1) {
          math = [parseFloat(money), math[1]];
        } 
        else if (isMathNumber == 2) {
          var index = -1;
          var second = 0;
          var result = 0;
          index = money.indexOf("+");
          // 减号
          if (index == -1) {
            index = money.indexOf("-");
            second = money.substring(index + 1);
            second = parseFloat(second);
            result = math[0] - second;
            result = Math.round(result * 100) / 100;
          } 
          // 加号
          else {
            second = money.substring(index + 1);
            second = parseFloat(second);
            result = math[0] + second;
          }

          money = result;
          math = [result, 0];
          isMathNumber = 1;
        }
        // 赋值
        lastMoney = str;
        money = money + "" + str;
        // 切换为"完成"
        key = this.setKeyArr("完成");
        // 小数点判断
        isPoint = this.setPointArr(money);
      }
    }
    // 点
    else if (index == 12) {
      str = ".";
      // 判断
      if (money == 0) {
        if (math[isMathNumber - 1] == 0) {
          math[isMathNumber - 1] = 1;
          lastMoney = ".";
          money = str;
        }
      } else {
        if (math[isMathNumber - 1] == 0) {
          math[isMathNumber - 1] = 1;
          lastMoney = ".";
          money = money + str;
        }
      }
    }
    // 删除
    else if (index == 14) {
      if (this.state.money.length == undefined || this.state.money.length <= 1) {
        money = "0";
        lastMoney = "0";
        isMathNumber = 1;
        math = [0, 0];
      } else {
        if (lastMoney == ".") {
          math[isMathNumber - 1] = 0;
        }
        var moneyArr = this.state.money.split("");
        moneyArr = moneyArr.slice(0, -1);
        money = moneyArr.join("");
        lastMoney = money.substring(money.length - 1);
        if (lastMoney == "+" || lastMoney == "-") {
          isMathNumber = 1;
          // "="改"完成"
          key = this.setKeyArr("完成");
        }
      }
    }
    // 等于/完成
    else if (index == 15) {
      // 完成
      if (key[15] == '完成') {
        this.props.onFinishClick()
      } 
      // 等号
      else {
        var index = -1;
        var second = 0;
        var result = 0;
        index = money.indexOf("+");
        // 减号
        if (index == -1) {
          index = money.indexOf("-");
          second = money.substring(index + 1);
          second = parseFloat(second);
          result = math[0] - second;
          result = Math.round(result * 100) / 100;
        } 
        // 加号
        else {
          second = money.substring(index + 1);
          second = parseFloat(second);
          result = math[0] + second;
          result = Math.round(result * 100) / 100;
        }
        money = result;
        math = [result, 0];
        isMathNumber = 1;

        // 赋值
        lastMoney = lastMoney;
        money = money + "";
        // 切换为"完成"
        key = this.setKeyArr("完成");
        // 小数点判断
        isPoint = this.setPointArr(money);
      }
    }
    // 日期/今天
    else if (index == 3) {
      this.props.onPressDay();
    }

    this.setState({
      lastMoney: lastMoney,
      money: money,
      key: key,
      isMathNumber: isMathNumber,
      math: math
    })

    
  }

  //======================== 控件 ========================//
  top() {
    return (
      <View style={styles.top}>
        <Text style={styles.topName}>备注:</Text>
        <TextInput
          ref={'textInput'}
          style={styles.topInput}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
          returnKeyType={"done"}
          selectionColor={"#282828"}
          spellCheck={false}
        />
        <Text style={styles.topNumber}>{this.state.money}</Text>
      </View>
    )
  }
  bottom() {
    let arr = [];
    for (let i=0; i<16; i++) {
      arr.push(
        <TouchableHighlight 
          key={i} 
          underlayColor={"rgba(233,233,233,1)"} 
          onPress={()=>this.onKey(i)}
        >
          <View style={[styles.bottomView,{
            backgroundColor: i == 15 ? StreamColor : 'rgba(250,250,250,1)',
          }]}>
            {this.bottomView(i)}
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <View style={styles.bottom}>
        {arr}
      </View>
    )
  }
  bottomView(index) {
    if (index != 14) {
      return (<Text style={styles.bottomText}>{index == 3 ? this.props.day : this.state.key[index]}</Text>)
    } else {
      return (<Image source={require('../../assets/images/tally_keyboard_del.png')}/>)
    }
  }
  render() {
    return (
      <Animated.View style={[styles.container,{
        height: this.state.opacity.interpolate({//映射到0.0,1.0之间
          inputRange: [0, 1],
          outputRange: [35 + ScreenWidth / 4 / 2 * 4, 0]
        })
      }]}>
        {this.top()}
        {this.bottom()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  // 顶部
  top: {
    width: ScreenWidth,
    height: 35,
    backgroundColor: 'rgba(250,250,250,1)',
    borderTopWidth: 1,
    borderColor: 'rgba(222,222,222,1)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topName: {
    fontWeight: '300',
    color: 'rgba(15,15,15,1)',
    fontSize: 12,
    marginLeft: 10,
    marginRight: 5,
  },
  topInput: {
    flex: 1,
    fontWeight: '300',
    color: 'rgba(15,15,15,1)',
    marginRight: 10,
  },
  topNumber: {
    marginRight: 10,
    fontWeight: '400',
    color: 'rgba(15,15,15,1)',
  },
  // 底部
  bottom: {
    width: ScreenWidth,
    backgroundColor: 'rgba(250,250,250,1)',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomView: {
    width: ScreenWidth / 4,
    height: ScreenWidth / 4 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(222,222,222,1)',
  },
  bottomText: {
    color: 'rgba(15,15,15,1)',
    fontWeight: '400',
    fontSize: 13,
  }
});

Keyboard.defaultProps = {
  onPressDay: ()=>{},
  onFinishClick: ()=>{},
}
Keyboard.propTypes = {
  onPressDay: PropTypes.func,
  onFinishClick: PropTypes.func,
}

// 连接组件
export default Keyboard;
// export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);