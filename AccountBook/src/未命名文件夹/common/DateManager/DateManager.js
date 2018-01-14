

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
// 控件
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

export default class DateManager {

  // 获取当前年份
  static getYear(date) {
    return date.getFullYear();
  }
  // 获取当前月份
  static getMonth(date) {
    return date.getMonth(date) + 1;
  }
  // 获取当前周
  static getWeekNumber(y, m, d) {
    var now = new Date(y, m - 1, d),
        year = now.getFullYear(),
        month = now.getMonth(),
        days = now.getDate();
    //那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += DateManager.getMonthDays(year, i);
    }

    //那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / yearFirstDay);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }

    return week;
  }
  // 获取当前天数
  static getDay(now) {
    var firstDay = new Date(now.getFullYear(), 0, 1);
    //计算当前时间与本年第一天的时差(返回一串数值，代表两个日期相差的毫秒数)
    var dateDiff = now - firstDay;
    //一天的毫秒数
    var msPerDay = 1000 * 60 * 60 * 24;
    //计算天数
    var diffDays = Math.ceil(dateDiff/ msPerDay);
    return diffDays;
  }

  // 通过week获取当前日期
  static getDateWithWeek(year, week) {
    var days = (week - 1) * 7;
    var date = new Date(year, 0, 1);
    date.setDate(date.getDate() + days);
    var arr = [];
    for (let i=0; i<7; i++) {
      arr.push(DateManager.addDate(date, i));
    }
    return arr;
  }
  // 当前日期上加一天
  static addDate(date, days) {
    if ((days == undefined || days == '') && days != 0) {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var now = new Date();
    var currentMonth = now.getMonth() + 1;
    var currentDay = now.getDate();
    if (currentMonth == month && currentDay == day) {
      return "今天";
    } else {
      return month + '-' + day + "";
    }
  }



  // 获取2016-10-09 的具体值
  static getDateWithGang(date, index) {
    var arr = date.split("-");
    return parseInt(arr[index]);
  }

  // 获取日期范围
  static getDateRange(index) {
    // 获取最早和最晚的数据
    


    // 以这种形式保存
    /*
    年: [
      {"year": 2015, "month": 12, "day": 15, "week": 51, "desc": "2015年"},
      {"year": 2016, "month": 12, "day": 15, "week": 51, "desc": "去年"},
      {"year": 2017, "month": 12, "day": 15, "week": 51, "desc": "今年"},
    ],
    月: [
      {"year": 2015, "month": 12, "day": 15, "week": 51, "desc": "2015-12月"},
      ...
      {"year": 2017, "month": 10, "day": 15, "week": 51, "desc": "10月"},
      {"year": 2017, "month": 11, "day": 15, "week": 51, "desc": "上月"},
      {"year": 2017, "month": 12, "day": 15, "week": 51, "desc": "本月"},
    ],
    周: [
      {"year": 2015, "month": 12, "day": 15, "week": 51, "desc": "2015-51周"},
      ...
      {"year": 2017, "month": 12, "day": 1, "week": 49, "desc": "49周"},
      {"year": 2017, "month": 12, "day": 17, "week": 50, "desc": "上周"},
      {"year": 2017, "month": 12, "day": 15, "week": 51, "desc": "本周"},
    ]
    */

    var date = new Date();
    // 年
    if (index == 0) {
      return ['去年','今年'];
    } 
    // 月
    else if (index == 1) {
      let month = DateManager.getMonth(date);
      let arr = [];
      for (let i=0; i<14; i++) {
        if (i == 0) {
          arr.push('本月');
        } else if (i == 1) {
          arr.push('上月');
        } else if (month - i > 0) {
          arr.push((month-i) + "月");
        } else {
          arr.push((DateManager.getYear(date)-1)+"-"+(month-i+12) + "月");
        }
      }
      arr.reverse();
      return arr;
    } 
    // 周
    else if (index == 2) {
      let currentWeek = DateManager.getWeekNumber(
        DateManager.getYear(date),
        DateManager.getMonth(date),
        (new Date()).getDay()
      );
      let arr = [];
      for (let i=0; i<52 + 3; i++) {
        if (i == 0) {
          arr.push('本周');
        } else if (i == 1) {
          arr.push('上周');
        } else if (currentWeek - i > 0) {
          arr.push((currentWeek-i)+"周");
        } else {
          arr.push((DateManager.getYear(new Date())-1)+"-"+(currentWeek-i+52)+"周");
        }
      }
      arr.reverse();
      return arr;
    }
  }






  // 判断年份是否为润年
  static isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
  }
  // 获取某一年份的某一月份的天数
  static getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (DateManager.isLeapYear(year) ? 29 : 28);
  }


}