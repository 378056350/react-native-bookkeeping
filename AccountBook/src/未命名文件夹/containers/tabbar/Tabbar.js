import {StackNavigator, TabNavigator, addNavigationHelpers} from 'shimo-navigation';
import {View, Text, Image, StyleSheet, Platform, TouchableHighlight, TouchableOpacity} from 'react-native';
import {NavigationColor, NavigationTitle, TabbarBackground, TabbarNormalTitle, TabbarSelectTitle, StreamColor} from '../../public/Public';
// Redux
import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
// 控件
import Button    from '../../common/Button/Button';
import BackLeft  from '../../common/Back/BackLeft';
import BackRight from '../../common/Back/BackRight';


import Mine   from '../mine/Mine';
import Badge  from '../mine/Badge';
import Push   from '../mine/Push';
import Help   from '../mine/Help';
import Category from '../mine/Category';
import Screenshots   from '../mine/Screenshots';
import AddCategory   from '../mine/AddCategory';
import About  from '../mine/About';
import Find   from '../find/Find';
import Bills  from '../find/Bills';
import Details from '../details/Details';
import Item  from '../details/Item';
import Chart from '../chart/Chart';
import Bookkeep  from '../bookkeep/Bookkeep';
import NoneThing from '../bookkeep/NoneThing';

// 导航栏高度
const navigationH = Platform.select({ios: 64, android: 44});
// 导航栏字体
const navigationFontSize = Platform.select({ios: 15, android: 15});
// tabbar高度
const tabBarH = Platform.select({ios: 54, android: 64});
// tabbar字体大小
const tabbarFontSize = Platform.select({ios: 10, android: 12});
// 是否手动返回
const gestures = Platform.select({ios: true, android: false});
// 图片
const tabBar_detail_n   = require('../../assets/images/tabbar_detail_n.png');
const tabBar_detail_s   = require('../../assets/images/tabbar_detail_s.png');
const tabBar_chart_n    = require('../../assets/images/tabbar_chart_n.png');
const tabBar_chart_s    = require('../../assets/images/tabbar_chart_s.png');
const tabBar_add_n      = require('../../assets/images/tabbar_add_n.png');
const tabBar_add_h      = require('../../assets/images/tabbar_add_h.png');
const tabBar_discover_n = require('../../assets/images/tabbar_discover_n.png');
const tabBar_discover_s = require('../../assets/images/tabbar_discover_s.png');
const tabBar_mine_s     = require('../../assets/images/tabbar_mine_s.png');
const tabBar_mine_n     = require('../../assets/images/tabbar_mine_n.png');
const tabBar_setting_n  = require('../../assets/images/tabbar_settings_n.png');
const tabBar_setting_s  = require('../../assets/images/tabbar_settings_s.png');
const backIcon          = require('../../assets/images/nav_back_h.png');

class TabbarIcon extends Component {

  pushBookKeep() {
    const { navigate } = this.props.navigation;
    navigate("Bookkeep");
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} 
                        onPress={()=>this.pushBookKeep()} 
                        disabled={this.props.width == 0 ? true : false}>
        <Image source={this.props.source} style={{
              height: this.props.width == 0 ? 25 : 60,
              width: this.props.width == 0 ? 25 : 60,
              marginBottom: this.props.width,
        }}/>
      </TouchableOpacity>
    );
  }
}



/**
* 控制器设置
*
* screen: 控制器名称
* navTitle: navigation标题
* tabTitle: tabbar标题
* navFontSize: navigation字体大小
* tabIcon: tabbar图片
* tabSelectIcon: tabbar选中图片
* isBack: 是否有返回按钮
* isHide: 是否隐藏navigation
*/
controllerSetting = (screenName, navTitle, tabTitle, navFontSize, tabIcon, tabSelectIcon, isBack, isHide) => {
  // 隐藏导航栏
  if (isHide == true) {
    let iconW = tabTitle == '记账' ? 80 : 25;
    let isGesturesEnabled = (tabTitle == '记账' || tabTitle == '截图') ? false : gestures;
    return ({
      screen: screenName,
      navigationOptions: ({navigation, screenProps}) => ({
        header: null,
        gesturesEnabled: isGesturesEnabled,
        tabBarIcon: (({tintColor, focused}) => {
          return (
            <TabbarIcon source={!focused? tabIcon: tabSelectIcon} 
                        width={iconW == 80 ? 20 : 0}
                        navigation={navigation}/>
          )
        }),
        tabBarLabel: tabTitle,
      })
    })
  } 
  // 显示导航栏
  else {
    let iconW = tabTitle == '记账' ? 80 : 25;
    return ({
      screen: screenName,
      navigationOptions: ({navigation, screenProps}) => ({
        headerTitle: navTitle,
        headerLeft: (isBack == true ? <BackLeft navigation={navigation}/> : <View/>),
        headerRight: (isBack == true ? <BackRight rightIcon={true}/> : <View/>),
        headerStyle: {
          backgroundColor: NavigationColor,
          height: navigationH,
        }, 
        headerTitleStyle: {
          fontSize: navFontSize,
          color: NavigationTitle,
          alignSelf: 'center',
          fontWeight: '400',
        },
        screen: screenName,
        navigationOptions: ({navigation, screenProps}) => ({
          header: null,
          gesturesEnabled: isGesturesEnabled,
          tabBarIcon: (({tintColor, focused}) => {
            return (<Image source={!focused? tabIcon: tabSelectIcon} style={{
                height: 25,
                width: 25
              }}/>)
          }),
          tabBarLabel: tabTitle,
        }),
        gesturesEnabled: gestures,
        tabBarIcon: (({tintColor, focused}) => {
          return (
            <TabbarIcon source={!focused? tabIcon: tabSelectIcon} 
                        width={iconW == 80 ? 20 : 0}
                        navigation={navigation}/>
          )
        }),
        tabBarLabel: tabTitle,
      })
    })
  }
}


const MyTab = TabNavigator({
  Details: controllerSetting(Details, '明细', '明细', navigationFontSize, tabBar_detail_n, tabBar_detail_s, false, true),
  Chart: controllerSetting(Chart, '图表', '图表', navigationFontSize, tabBar_chart_n, tabBar_chart_s, false, true),
  NoneThing: controllerSetting(NoneThing, '记账', '记账', navigationFontSize, tabBar_add_n, tabBar_add_h, false, false),
  Find: controllerSetting(Find, '发现', '发现', navigationFontSize, tabBar_discover_n, tabBar_discover_s, false, true),
  Mine: controllerSetting(Mine, '我的', '我的', navigationFontSize, tabBar_mine_n, tabBar_mine_s, false, true),
}, {
  tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
  swipeEnabled: false,      // 是否允许在标签之间进行滑动。
  animationEnabled: false,  // 是否在更改标签时显示动画。
  lazy: true,               // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
  initialRouteName: '',     // 设置默认的页面组件
  backBehavior: 'none',     // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  tabBarOptions: {
    inactiveTintColor: TabbarNormalTitle,
    activeTintColor: TabbarSelectTitle,
    inactiveBackgroundColor: TabbarBackground, 
    activeBackgroundColor: TabbarBackground,
    showIcon: true,
    showLabel: true, 
    style: {
      height: tabBarH,
      backgroundColor: 'white'
    }, 
    labelStyle: {
      fontSize: tabbarFontSize,
      paddingBottom: 5,
      color: TabbarNormalTitle
    }, 
    upperCaseLabel: false,
    indicatorStyle: {
      height: 0,
    }, 
  }
});


export default MyApp = StackNavigator({
  MyTab: {
    screen: MyTab
  },
  Badge: controllerSetting(Badge, '徽章', '徽章', navigationFontSize, tabBar_chart_n, tabBar_chart_s, true, true),
  Category: controllerSetting(Category, '类别设置', '类别设置', navigationFontSize, tabBar_chart_n, tabBar_chart_s, true, true),
  Bookkeep: controllerSetting(Bookkeep, '记账', '记账', navigationFontSize, tabBar_add_n, tabBar_add_h, false, true),
  Push: controllerSetting(Push, '定时提醒', '定时提醒', navigationFontSize, tabBar_chart_n, tabBar_chart_s, true, true),
  Help: controllerSetting(Help, '帮助', '帮助', navigationFontSize, tabBar_mine_n, tabBar_mine_s, false, true),
  About: controllerSetting(About, '关于鲨鱼笔记', '关于鲨鱼笔记', navigationFontSize, tabBar_mine_n, tabBar_mine_s, false, true),
  Bills: controllerSetting(Bills, '账单', '账单', navigationFontSize, tabBar_mine_n, tabBar_mine_s, false, true),
  Item: controllerSetting(Item, '账单', '账单', navigationFontSize, tabBar_mine_n, tabBar_mine_s, true, true),
  Screenshots: controllerSetting(Screenshots, '截图', '截图', navigationFontSize, tabBar_mine_n, tabBar_mine_s, true, true),
  AddCategory: controllerSetting(AddCategory, '添加支出类别', '添加支出类别', navigationFontSize, tabBar_mine_n, tabBar_mine_s, true, true),
}, {
  
});



