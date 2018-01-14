
import { Platform } from 'react-native';
import { StreamColor, TitleColor } from '../../utils/index';

//============================ navigation ============================//
/** 高度 */
export const NAVIGATION_HEIGHT = Platform.select({ios: 64, android: 44});
/** 背景色 */
export const NAVIGATION_BACK_COLOR = StreamColor;
/** 字体大小 */
export const NAVIGATION_FONT_SIZE = Platform.select({ios: 16, android: 15});
/** 字体颜色 */
export const NAVIGATION_FONT_COLOR = TitleColor;


//============================== TabBar =============================//
/** 高度 */
export const TABBAR_HEIGHT = Platform.select({ios: 54, android: 64});
/** 背景色 */
export const TABBAR_BACK_COLOR = 'white';
/** 字体大小 */
export const TABBAR_FONT_SIZE = Platform.select({ios: 10, android: 12});
/** 字体颜色 */
export const TABBAR_FONT_COLOR_NORMAL = TitleColor;
export const TABBAR_FONT_COLOR_SELECT = TitleColor;


//============================== Other ==============================//
/** 是否手动返回 */
export const gestures = Platform.select({ios: true, android: false});



// 图片
export const tabBar_detail_n   = require('../../assets/images/tabbar_detail_n.png');
export const tabBar_detail_s   = require('../../assets/images/tabbar_detail_s.png');
export const tabBar_chart_n    = require('../../assets/images/tabbar_chart_n.png');
export const tabBar_chart_s    = require('../../assets/images/tabbar_chart_s.png');
export const tabBar_add_n      = require('../../assets/images/tabbar_add_n.png');
export const tabBar_add_h      = require('../../assets/images/tabbar_add_h.png');
export const tabBar_discover_n = require('../../assets/images/tabbar_discover_n.png');
export const tabBar_discover_s = require('../../assets/images/tabbar_discover_s.png');
export const tabBar_mine_s     = require('../../assets/images/tabbar_mine_s.png');
export const tabBar_mine_n     = require('../../assets/images/tabbar_mine_n.png');
export const tabBar_setting_n  = require('../../assets/images/tabbar_settings_n.png');
export const tabBar_setting_s  = require('../../assets/images/tabbar_settings_s.png');
export const backIcon          = require('../../assets/images/nav_back_h.png');




