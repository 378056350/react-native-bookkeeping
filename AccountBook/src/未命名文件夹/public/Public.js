import {Platform, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

export const ScreenWidth = width; // 屏幕宽度
export const ScreenHeight = height; // 屏幕高度
export const Padding = 30; // 屏幕间距
export const StreamColor = 'rgba(255,218,68,1)'; // 主流颜色
export const NavigationColor = StreamColor; // 导航栏颜色
export const NavigationTitle = '#282828'; // 导航栏字体
export const TabbarNormalTitle = '#777'; // tabbar文字
export const TabbarSelectTitle = StreamColor; // tabbar选种颜色
export const TabbarBackground = 'white'; // tabbar背景色
