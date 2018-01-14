

export default class DateManager {

    /** 获取日期 */
    static getDate(date, days) {
        if (days == undefined || days == '') {
            days = 0;
        }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + DateManager.getFormatDate(month) + '-' + DateManager.getFormatDate(day);
    }
    /** 获取年 */
    static getYear() {
        var date = new Date();
        return date.getFullYear();
    }
    /** 获取月 */
    static getMonth() {
        var date = new Date();
        return date.getMonth() + 1;
    }
    /** 获取日 */
    static getDay() {
        var date = new Date();
        var num = date.getDate();
        var length = 2;
        return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;;
    }
    /** 获取周 */
    //判断当前日期为当年第几周
    static getWeek(a, b, c) {
        if (a == undefined) {
            a = DateManager.getYear()
            b = DateManager.getMonth()
            c = DateManager.getDay()
        }
        var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    };
    // static getWeek(y, m, d) {
    //     var now = new Date(y, m - 1, d);
    //     year = now.getFullYear(),
    //     month = now.getMonth(),
    //     days = now.getDate();
    //     //那一天是那一年中的第多少天
    //     for (var i = 0; i < month; i++) {
    //         days += DateManager.getMonthDays(year, i);
    //     }
    //     //那一年第一天是星期几
    //     var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
    //     var week = null;
    //     if (yearFirstDay == 1) {
    //         week = Math.ceil(days / yearFirstDay);
    //     } else {
    //         days -= (7 - yearFirstDay + 1);
    //         week = Math.ceil(days / 7) + 1;
    //     }
    //     return week;
    // }
    /** 获取小时 */
    static getHour() {
        var date = new Date();
        return date.getHours();
    }
    /** 获取分钟 */
    static getMinute() {
        var date = new Date();
        return date.getMinutes();
    }
    /** 获取星期几 */
    static getWeekday(y, m, d) {
        var l = ["日","一","二","三","四","五","六"];
        var d = new Date(y, m, d).getDay();
        return l[d];
    }


    // 获取某一年份的某一月份的天数
    static getMonthDays(year, month) {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (DateManager.isLeapYear(year) ? 29 : 28);
    }
    // 判断年份是否为润年
    static isLeapYear(year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
    // 日期月份/天的显示，如果是1位数，则在前面加上'0'
    static getFormatDate(arg) {
        if (arg == undefined || arg == '') {
            return '';
        }

        var re = arg + '';
        if (re.length < 2) {
            re = '0' + re;
        }

        return re;
    }
    static getDaysWithMonthAndYear() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var d = new Date(year, month, 0);
        return d.getDate();
    }

}





// // 时间
// export const DATE_ENUM = {
//     YEAR: 0,   // 年
//     MONTH: 1,  // 月
//     WEEK: 2,   // 周
//     DAY: 3,    // 日   
// };

// export default class DateManager {

//     /** 获取日期 */
//     static getDate(date, days) {
//         if (days == undefined || days == '') {
//             days = 0;
//         }
//         var date = new Date(date);
//         date.setDate(date.getDate() + days);
//         var month = date.getMonth() + 1;
//         var day = date.getDate();
//         return date.getFullYear() + '-' + DateManager.getFormatDate(month) + '-' + DateManager.getFormatDate(day);
//     }
//     // 日期月份/天的显示，如果是1位数，则在前面加上'0'
//     static getFormatDate(arg) {
//         if (arg == undefined || arg == '') {
//             return '';
//         }

//         var re = arg + '';
//         if (re.length < 2) {
//             re = '0' + re;
//         }

//         return re;
//     }

//     /** 获取年 */
//     static getYear() {
//         var date = new Date();
//         return date.getFullYear();
//     }
//     /** 获取月 */
//     static getMonth() {
//         var date = new Date();
//         return date.getMonth() + 1;
//     }
//     /** 获取日 */
//     static getDay() {
//         var date = new Date();
//         return date.getDate();
//     }

//     static calculateData(data, DATE_ENUM) {
//         var dataArr = {};
//         for (let i=0; i<data.length; i++) {
//             var key;
//             var account = data[i];
//             if (DATE_ENUM == YEAR) {
//                 key = account.year;
//             } else if (DATE_ENUM == MONTH) {
//                 key = account.year + '年' +  account.month + '月';
//             } else if (DATE_ENUM == WEEK) {
//                 key = account.year + '年' +  account.week + '周';
//             } else if (DATE_ENUM == DAY) {
//                 key = account.year + '年' +  account.month + '月' +  account.day + '日';
//             }
//             var subdata = dataArr[key] ? dataArr[key] : {data: [], inmax: 0, exMax: 0};1 
            

//         }
//     }

// }