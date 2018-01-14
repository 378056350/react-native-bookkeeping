// Default
import React, { Component } from 'react';
import { Easing, Animated } from 'react-native';
import { StackNavigator, TabNavigator, addNAVIGATION_HEIGHTelpers } from 'shimo-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity 
} from 'react-native';
// Setting
import {
  NAVIGATION_HEIGHT,
  NAVIGATION_BACK_COLOR,
  NAVIGATION_FONT_SIZE,
  NAVIGATION_FONT_COLOR,
  TABBAR_HEIGHT,
  TABBAR_BACK_COLOR,
  TABBAR_FONT_SIZE,
  TABBAR_FONT_COLOR_NORMAL,
  TABBAR_FONT_COLOR_SELECT,
  gestures,
} from './TabbarSetting';
import {
  tabBar_detail_n,
  tabBar_detail_s,
  tabBar_chart_n,
  tabBar_chart_s,
  tabBar_add_n,
  tabBar_add_h,
  tabBar_discover_n,
  tabBar_discover_s,
  tabBar_mine_s,
  tabBar_mine_n,
  tabBar_setting_n,
  tabBar_setting_s,
  backIcon,
} from './TabbarSetting';
// Component
import { Button, BackLeft, BackRight } from '../../common/index';
import TabbarIcon from './TabbarIcon';
import { 
  Web,
  Discovery,
  Home,
  Chart,
  ChartDetail,
  Account,
  None,
  Mine,
  Category,
  Bill,
  Update,
  About,
  Badge,
  Timing,
  Detail,
  AddCategory,
  Flaunt 
} from '../index';

getController = (data) => {
  return ({
    screen: data.screenName,
    navigationOptions: ({navigation, screenProps}) => ({
      header: null,
      // headerTitle: data.navTitle,
      // headerLeft: (()=>{
      //   if (data.isLeft == true) {
      //     if (data.leftView != undefined) {
      //       return data.rightView
      //     } else {
      //       return <BackLeft navigation={navigation}/>
      //     }
      //   } else {
      //     return <View/>
      //   }
      // })(),
      // headerRight: (()=>{
      //   if (data.isRight == true) {
      //     return <BackRight rightIcon={true} navigation={navigation} onPress={navigation.state.params ? navigation.state.params.rightPress : null}/>
      //   } else {
      //     return <View/>
      //   }
      // })(),
      // headerStyle: {
      //   backgroundColor: NAVIGATION_BACK_COLOR,
      //   height: NAVIGATION_HEIGHT,
      // }, 
      // headerTitleStyle: {
      //   fontSize: data.navFontSize,
      //   color: NAVIGATION_FONT_COLOR,
      //   alignSelf: 'center',
      //   fontWeight: '400',
      // },
      gesturesEnabled: data.isGestures,
      tabBarIcon: (({tintColor, focused}) => {
        return (
          <TabbarIcon source={!focused? data.icon_normal: data.icon_select} 
                      normal={data.icon_normal}
                      select={data.icon_select}
                      isBig={data.isBig == true ? true : false}
                      navigation={navigation}/>
        )
      }),
      tabBarLabel: data.tabTitle,
      tabBarOnPress:(({ route, index },jumpToIndex)=>{
        if (route.routeName != 'None') {
          jumpToIndex(index);
        }
      }),
    })
  })
}

const MyTab = TabNavigator({
  Home: getController({
    'screenName': Home, 
    'navTitle': '首页', 
    'isLeft': false, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '首页',
    'icon_normal': tabBar_detail_n,
    'icon_select': tabBar_detail_s,
  }),
  Chart: getController({
    'screenName': Chart, 
    'navTitle': '图表', 
    'isLeft': false, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '图表',
    'icon_normal': tabBar_chart_n,
    'icon_select': tabBar_chart_s,
  }),
  None: getController({
    'screenName': None, 
    'navTitle': '记账', 
    'isLeft': false, 
    'isRight': false,
    'isBig': true,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '记账',
    'icon_normal': tabBar_add_n,
    'icon_select': tabBar_add_h,
  }),
  Discovery: getController({
    'screenName': Discovery, 
    'navTitle': '发现', 
    'isLeft': false, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '发现',
    'icon_normal': tabBar_discover_n,
    'icon_select': tabBar_discover_s,
  }),
  Mine: getController({
    'screenName': Mine, 
    'navTitle': '我的', 
    'isLeft': false, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '我的',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  })
}, {
  tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
  swipeEnabled: false,      // 是否允许在标签之间进行滑动。
  animationEnabled: false,  // 是否在更改标签时显示动画。
  lazy: true,               // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
  initialRouteName: 'Home', // 设置默认的页面组件
  backBehavior: 'none',     // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  tabBarOptions: {
    inactiveTintColor: TABBAR_FONT_COLOR_NORMAL,
    activeTintColor: TABBAR_FONT_COLOR_SELECT,
    inactiveBackgroundColor: TABBAR_BACK_COLOR, 
    activeBackgroundColor: TABBAR_BACK_COLOR,
    showIcon: true,
    showLabel: true, 
    style: {
      height: TABBAR_HEIGHT,
      backgroundColor: 'white',
    }, 
    labelStyle: {
      fontSize: TABBAR_FONT_SIZE,
      paddingBottom: 5,
    }, 
    pressOpacity: 1,
    upperCaseLabel: false,
    indicatorStyle: {
      height: 0,
    }, 
  },
});

export default MyApp = StackNavigator({
  MyTab: {
    screen: MyTab,
  },
  Category: getController({
    'screenName': Category, 
    'navTitle': '分类', 
    'isLeft': false, 
    'isRight': false,
    'isBig': true,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': true,
    'tabTitle': '分类',
    'icon_normal': tabBar_add_n,
    'icon_select': tabBar_add_h,
  }),
  Bill: getController({
    'screenName': Bill, 
    'navTitle': '账单', 
    'isLeft': true, 
    'isRight': true,
    'isBig': true,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': true,
    'tabTitle': '账单',
    'icon_normal': tabBar_add_n,
    'icon_select': tabBar_add_h,
  }),
  Update: getController({
    'screenName': Update, 
    'navTitle': '高级功能', 
    'isLeft': true, 
    'isRight': false,
    'isBig': true,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': true,
    'tabTitle': '高级功能',
    'icon_normal': tabBar_add_n,
    'icon_select': tabBar_add_h,
  }),
  About: getController({
    'screenName': About, 
    'navTitle': '关于鲨鱼记账', 
    'isLeft': false, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '关于鲨鱼记账',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
  Badge: getController({
    'screenName': Badge, 
    'navTitle': '徽章', 
    'isLeft': false, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '徽章',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
  Timing: getController({
    'screenName': Timing, 
    'navTitle': '定时提醒', 
    'isLeft': false, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '定时提醒',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
  ChartDetail: getController({
    'screenName': ChartDetail, 
    'navTitle': '详情', 
    'isLeft': true, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '详情',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
  Detail: getController({
    'screenName': Detail, 
    'navTitle': '详情', 
    'isLeft': true, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '详情',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
  AddCategory: getController({
    'screenName': AddCategory, 
    'navTitle': '添加类别', 
    'isLeft': true, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '添加类别',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
  Account: getController({
    'screenName': Account, 
    'navTitle': '记账', 
    'isLeft': false, 
    'isRight': false,
    'isBig': true,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '记账',
    'icon_normal': tabBar_add_n,
    'icon_select': tabBar_add_h,
  }),
  Category: getController({
    'screenName': Category, 
    'navTitle': '分类', 
    'isLeft': false, 
    'isRight': false,
    'isBig': true,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': true,
    'tabTitle': '分类',
    'icon_normal': tabBar_add_n,
    'icon_select': tabBar_add_h,
  }),
  Flaunt: getController({
    'screenName': Flaunt, 
    'navTitle': '炫耀', 
    'isLeft': true, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '炫耀',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
  Web: getController({
    'screenName': Web, 
    'navTitle': '网站', 
    'isLeft': true, 
    'isRight': false,
    'isBig': false,
    'navFontSize': NAVIGATION_FONT_SIZE,
    'isGestures': false,
    'tabTitle': '网站',
    'icon_normal': tabBar_mine_n,
    'icon_select': tabBar_mine_s,
  }),
}, {
  
});



