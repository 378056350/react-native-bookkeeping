

import RealmManager     from '../Realm/RealmManager';
import StorageManager   from '../Storage/StorageManager';
import DateManager      from '../DateManager/DateManager';
import { 
    IS_PUNCH, 
    PUNCH_CONTINUOUS, 
    ACCOUNT_TOTAL, 
    CATEGORY_TABLE,
    CATEGORY_DELETE_TABLE,
    ACCOUNT_TABLE,
    MINE_VOICE,
    MINE_DETAIL
} from './SaveEnum';
import { CATEGORY_JSON } from '../../assets/json/AccountJson';

// 时间
export const DATE_ENUM = {
    YEAR: 0,   // 年
    MONTH: 1,  // 月
    WEEK: 2,   // 周
    DAY: 3,    // 日
};
// 比较
export const COMPARE_ENUM = {
    MORE: 0,  // 大于
    LESS: 1,  // 小于
};
export default class Save {
    // 初始化
    static initialization() {
        StorageManager.initialization();
        RealmManager.initialization();
        Category.initialization();
    }
    // 保存数据
    static save(key, value) {
        if (key === IS_PUNCH) {
            Punch.save(key, value)
        }
    }
    // 读取数据
    static load(key, success, fail) {
        if (key === IS_PUNCH) {
            Punch.isPunch(success, fail)
        }   
    }

    //=========================== 打卡 ===========================//
    // 开始打卡
    static startPunch() {
        Punch.startPunch()
    }
    // 是否打卡
    static isPunch(block) {
        Punch.isPunch(block)
    }
    // 获取连续打卡
    static loadPunchContinuous(block) {
        Punch.loadPunchContinuous(block);
    }

    //=========================== 分类 ===========================//
    // 获取分类
    static getCategory() {
        return Category.getCategory()
    }

    //=========================== 数据 ===========================//
    // 存储
    static saveAccount(data) {
        Account.save(data);
    }
    // 读取
    static loadAccount() {
        return Account.load()
    }
    // 分类首页
    static arrangeHomeData(data) {
        return Account.arrangeHomeData(data);
    }
    // 分类图表
    static arrangeChartData(data) {
        return Account.arrangeChartData(data);
    }
    static getMaxId(block) {
        Account.getMaxId(block);
    }

    // 返回描述信息
    static getRemarkWithDate(date, date_enum) {
        return ArrayUtils.getRemarkWithDate(date, date_enum);
    }
    static getRemarkDeatilWithDate(date) {
        return ArrayUtils.getRemarkDeatilWithDate(date);
    }


    //=========================== 设置 ===========================//
    static saveVoice(isVoice) {
        Setting.saveVoice(isVoice);
    }
    static loadVoice(block) {
        Setting.loadVoice(block);
    }
    static saveDetail(isDetail) {
        Setting.saveDetail(isDetail);
    }
    static loadDetail(block) {
        Setting.loadDetail(block);
    }

    static toDecimal2(x) { 
        var f = parseFloat(x); 
        if (isNaN(f)) { 
          return false; 
        } 
        var f = Math.round(x*100)/100; 
        var s = f.toString(); 
        var rs = s.indexOf('.'); 
        if (rs < 0) { 
          rs = s.length; 
          s += '.'; 
        } 
        while (s.length <= rs + 2) { 
          s += '0'; 
        } 
        return s; 
    } 
}
class Punch {
    // 开始打卡
    static startPunch() {
        // 保存打卡
        StorageManager.saveWithKey(IS_PUNCH, DateManager.getDate(new Date()), 1000 * 60 * 24);
        // 连续打卡天数
        Punch.savePunchContinuous();
    }
    // 是否打卡
    static isPunch(block) {
        StorageManager.loadWithKey(IS_PUNCH, (data)=>{
            var now = DateManager.getDate(new Date());
            if (block) {
                if (now === data) {
                    block(true);
                } else {
                    block(false);
                }
            }
        }, (err)=>{
            if (block) {
                block(false);
            }
        });
    }
    // 保存连续打卡
    static savePunchContinuous() {
        Punch.loadPunchContinuous((data)=>{
            var count = data + 1;
            StorageManager.saveWithKey(PUNCH_CONTINUOUS, count, 1000 * 60 * 24 * 365);
        })
    }
    // 获取连续打卡
    static loadPunchContinuous(block) {
        StorageManager.loadWithKey(PUNCH_CONTINUOUS, (data)=>{
            if (block) {
                block(data);
            }
        },(err)=>{
            if (block) {
                block(0);
            }
        });
    }
}
class Category {
    // 初始化
    // 1.如果没有添加默认分类: 添加默认分类
    static initialization() {
        Category.isInitialization((isInit)=>{
            if (isInit == false) {
                StorageManager.saveWithKey(CATEGORY_TABLE, '123123', 1000 * 60 * 24 * 365); 
                let data = [];
                for (let i=0; i<CATEGORY_JSON.length; i++) {
                    RealmManager.save(CATEGORY_TABLE, {
                        id: CATEGORY_JSON[i].id, 
                        name: CATEGORY_JSON[i].name, 
                        inEx: CATEGORY_JSON[i].inEx, 
                        isDefault: CATEGORY_JSON[i].isDefault, 
                        icon: CATEGORY_JSON[i].icon,
                    })    
                }  
            }
        })
    }
    // 是否初始化过
    static isInitialization(block) {
        StorageManager.loadWithKey(CATEGORY_TABLE, (data)=>{
            if (block) {
                block(true);
            }
        },(err)=>{
            if (block) {
                block(false);
            }
        });
    }
    // 获取分类
    static getCategory() {
        let currentData = RealmManager.load(CATEGORY_TABLE);
        let deleteData  = RealmManager.load(CATEGORY_DELETE_TABLE);
        let currentInData = [];
        let currentExData = [];
        let deleteInData = [];
        let deleteExData = [];
        for (let i=0; i<currentData.length; i++) {
            if (currentData[i].inEx == 0) {
                currentInData.push (
                    currentData[i]
                )
            } else {
                currentExData.push (
                    currentData[i]
                )
            }
        }
        for (let i=0; i<deleteData.length; i++) {
            if (deleteInData[i].inEx == 0) {
                currentInData.push (
                    deleteData[i]
                )
            } else {
                deleteExData.push (
                    deleteData[i]
                )
            }
        }
        return [
            [currentInData, currentExData], 
            [deleteInData, deleteExData]
        ];
    }


    // 添加分类
    // 1.
    // 如果添加新分类: 添加分类
    // 如果添加被删除的分类: 添加分类, 从删除表删除分类

    // 删除分类 
    // 1. 当前表删除分类
    // 如果当前分类是默认分类: 添加到删除分类

    // 获取分类 [当前数据, 被删除数据]
    // 1.获取所有数据
    // 2.

    // 更改分类位置
}
class Account {
    // 存储
    static save(data) {
        Account.getMaxId((maxId)=>{
            StorageManager.saveWithKey(ACCOUNT_TABLE, maxId + 1, null);
            RealmManager.save(ACCOUNT_TABLE, {
                id: maxId + 1,
                sectionId: data.sectionId,
                name: data.name,
                remark: data.remark,
                year: data.year,
                month: data.month,
                week: data.week,
                day: data.day,
                money: data.money,
                inEx: data.inEx
            });
        });
    }
    // 读取
    static load() {
        let account = RealmManager.load(ACCOUNT_TABLE);
        return account;
    }
    // 整理首页
    static arrangeHomeData(data) {
        let newData = Account.arrangeHomeMonthData(data);
        newData.param = Account.arrangeHomeDayData(newData.param);
        return newData;
    }
    static arrangeHomeMonthData(data) {
        let param = {};
        if (data && data.length != 0) {
            var max = data[0];
            var min = data[0];
            for (let i=0; i<data.length; i++) {
                // 获取最小值, 最大值
                max = ArrayUtils.compareTo(max, data[i], COMPARE_ENUM.MORE);
                min = ArrayUtils.compareTo(min, data[i], COMPARE_ENUM.LESS);
                // 获取单笔记账
                let account = data[i];
                let key = account.year+"年"+account.month+"月";
                key = ArrayUtils.getRemarkWithDate(account, DATE_ENUM.MONTH);
                var keys = Object.keys(param);
                var subdata = {data: [], inmax: 0, exMax: 0};
                if (keys.length > 0 && ArrayUtils.contains(keys, key)) {
                    subdata = param[key];
                }
                // 计算数据
                subdata.data.push(account);
                if (account.inEx == 0) {
                    subdata.inmax = subdata.inmax + account.money;
                } else {
                    subdata.exMax = subdata.exMax + account.money;
                }
                param[key] = subdata;
            }
            var range = ArrayUtils.getDateRange(min, max, DATE_ENUM.MONTH);
            return {
                param: param,
                range: range,
            };
        } else {
            return {
                param: {'本月': {data: [], inmax: 0, exMax: 0}},
                range: [{year: DateManager.getYear(), month: DateManager.getMonth(), remark: "本月"}],
            };
        }
    }
    static arrangeHomeDayData(data) {
        let keys = Object.keys(data);
        var dayData = {};
        // 计算日
        for (let i=0; i<keys.length; i++) {
            let subdata = data[keys[i]].data;
            let newdata = {data: {}, inmax: 0, exmax: 0, year: 0, month: 0};
            for (let y=0; y<subdata.length; y++) {
                let account = subdata[y];
                let dayKeys = Object.keys(newdata.data);
                let daykey  = account.year + "" + DateManager.getFormatDate(account.month) + "" +  DateManager.getFormatDate(account.day) + "";
                let daydata = {
                    data: [], 
                    inmax: 0, 
                    exmax: 0, 
                    remark: DateManager.getFormatDate(account.month) + '月' + 
                            DateManager.getFormatDate(account.day) + '日  星期' +
                            DateManager.getWeekday(account.year, account.month-1, account.day),
                    day: account.day,
                };
                if (ArrayUtils.contains(dayKeys, daykey)) {
                    daydata = newdata.data[daykey];
                }
                daydata.data.push(account);
                if (account.inEx == 0) {
                    daydata.inmax += account.money;
                    newdata.inmax += account.money;
                } else if (account.inEx == 1) {
                    daydata.exmax += account.money;
                    newdata.exmax += account.money;
                }
                newdata.year = account.year;
                newdata.month = account.month;
                newdata.data[daykey] = daydata;
            }
            dayData[keys[i]] = newdata;
        }
        return dayData;
    }
    // 整理图表
    static arrangeChartData(data) {
        let param = Account.arrangeChartParam(data);
        let range = Account.arrangeChartRange(data);
        let newdata = [
            [param[0], param[0], range[0]],
            [param[1], param[1], range[1]],
            [param[2], param[2], range[2]]
        ];
        return newdata;
    }
    static arrangeChartParam(data) {
        // 周
        let week  = {};
        let month = {};
        let year  = {};
        for (let i=0; i<data.length; i++) {
            let account = data[i];
            let key = ArrayUtils.getRemarkWithDate(account, DATE_ENUM.WEEK);
            let keys = Object.keys(week);
            let subdata = {data:[], max: 0, avg: 0};
            if (ArrayUtils.contains(keys, key)) {
                subdata = week[key];
            }
            subdata.data.push(account);
            week[key] = subdata;
            week[key].max += account.money;
            if (week[key].max != 0) {
                week[key].avg = week[key].max / 7;
            }
        }
        for (let i=0; i<data.length; i++) {
            let account = data[i];
            let key = ArrayUtils.getRemarkWithDate(account, DATE_ENUM.MONTH);
            let keys = Object.keys(month);
            let subdata = {data:[], max: 0, avg: 0};
            if (ArrayUtils.contains(keys, key)) {
                subdata = month[key];
            }
            subdata.data.push(account);
            month[key] = subdata;
            month[key].max += account.money;
            if (month[key].max != 0) {
                month[key].avg = month[key].max / 30;
            }
        }
        for (let i=0; i<data.length; i++) {
            let account = data[i];
            let key = ArrayUtils.getRemarkWithDate(account, DATE_ENUM.YEAR);
            let keys = Object.keys(year);
            let subdata = {data:[], max: 0, avg: 0};
            if (ArrayUtils.contains(keys, key)) {
                subdata = year[key];
            }
            subdata.data.push(account);
            year[key] = subdata;
            year[key].max += account.money;
            if (year[key].max != 0) {
                year[key].avg = year[key].max / 12;
            }
        }
        return [week, month, year];
    }
    static arrangeChartRange(data) {
        if (data && data.length != 0) {
            var max = data[0];
            var min = data[0];
            for (let i=0; i<data.length; i++) {
                max = ArrayUtils.compareTo(max, data[i], COMPARE_ENUM.MORE);
                min = ArrayUtils.compareTo(min, data[i], COMPARE_ENUM.LESS);
            }
            let range1 = ArrayUtils.getDateRange(min, max, DATE_ENUM.YEAR);
            let range2 = ArrayUtils.getDateRange(min, max, DATE_ENUM.MONTH);
            let range3 = ArrayUtils.getDateRange(min, max, DATE_ENUM.WEEK);
            return [range3, range2, range1];
        } else {
            return [[{remark: '本周'}], [{remark: '本月'}], [{remark: '本年'}]];
        }
    }
    // 获取最大ID
    static getMaxId(block) {
        StorageManager.loadWithKey(ACCOUNT_TABLE, (data)=>{
            if (block) {
                block(data);
            }
        },(err)=>{
            if (block) {
                block(0);
            }
        });
    }
}
class Setting {
    static saveVoice(isVoice) {
        StorageManager.saveWithKey(MINE_VOICE, isVoice, null);
    }
    static loadVoice(block) {
        return StorageManager.loadWithKey(MINE_VOICE, (data)=>{
            if (block) {
                block(data);
            }
        },(err)=>{
            if (block) {
                block(false);
            }
        })
    }
    static saveDetail(isDetail) {
        StorageManager.saveWithKey(MINE_DETAIL, isDetail, null);
    }
    static loadDetail(block) {
        return StorageManager.loadWithKey(MINE_DETAIL, (data)=>{
            if (block) {
                block(data);
            }
        },(err)=>{
            if (block) {
                block(false);
            }
        })
    }
}
class ArrayUtils {
    // 数组是否包含某个元素
    static contains(array, item) {
        for (let i=0; i<array.length; i++) {
            if (array[i] == item) {
                return true;
            }
        }
        return false;
    }
    // 从日期1到日期2之间时间
    static getDateRange(date1, date2, date_enum) {
        let dateArr = [];
        for (let i=date1.year; i<=date2.year; i++) {
            if (date_enum == DATE_ENUM.YEAR) {
                dateArr.push({
                    year: i,
                    remark: ArrayUtils.getRemarkWithDate({year: i}, DATE_ENUM.YEAR)
                })
            } 
            else if (date_enum == DATE_ENUM.MONTH) {
                var maxMonth = i == date2.year ? date2.month : 12;
                var minMonth = i == date1.year ? date1.month : 1;
                for (let y=minMonth; y<=maxMonth; y++) {
                    dateArr.push({
                        year: i,
                        month: y,
                        remark: ArrayUtils.getRemarkWithDate({year: i, month: y}, DATE_ENUM.MONTH)
                    })
                }
            } 
            else if (date_enum == DATE_ENUM.WEEK) {
                var maxWeek = i == date2.year ? date2.week : 52;
                var minWeek = i == date1.year ? date1.week : 1;
                for (let y=minWeek; y<=maxWeek; y++) {
                    dateArr.push({
                        year: i,
                        week: y,
                        remark: ArrayUtils.getRemarkWithDate({year: i, week: y}, DATE_ENUM.WEEK)
                    })
                }
            }
        }
        return dateArr;
    }
    // 返回描述信息
    static getRemarkWithDate(date, date_enum) {
        if (date_enum == DATE_ENUM.YEAR) {
            let currentYear = DateManager.getYear();
            if (currentYear == date.year) {
                return "今年"
            } else if (currentYear - 1 == date.year) {
                return "去年";
            } else {
                return date.year + "年"
            }
        } else if (date_enum == DATE_ENUM.MONTH) {
            let currentYear = DateManager.getYear();
            let currentMonth = DateManager.getMonth();
            if (currentYear == date.year && currentMonth == date.month) {
                return "本月"
            } else if (currentYear == date.year && currentMonth - 1 == date.month) {
                return "上月";
            } else {
                if (currentYear != date.year) {
                    return date.year + "年" + date.month + "月"
                } else {
                    return date.month + "月"
                }
            }
        } else if (date_enum == DATE_ENUM.WEEK) {
            let currentYear = DateManager.getYear();
            let currentWeek = DateManager.getWeek();
            if (currentYear == date.year && currentWeek == date.week) {
                return "本周";
            } else if (currentYear == date.year && currentWeek - 1 == date.week) {
                return "上周";
            } else {
                if (currentYear != date.year) {
                    return date.year + "-" + date.week + "周"
                } else {
                    return date.week + "周"
                }
            }
        } else if (date_enum == DATE_ENUM.DAY) {
            let currentYear = parseInt(DateManager.getYear());
            let currentMonth = parseInt(DateManager.getMonth());
            let currentDay = parseInt(DateManager.getDay());
            date.year = parseInt(date.year);
            date.month = parseInt(date.month);
            date.day = parseInt(date.day);
            console.log(currentYear);
            console.log(currentMonth);
            console.log(currentDay);
            console.log(date);
            if (date.year == currentYear && date.month == currentMonth && date.day == currentDay) {
                return '今天';
            } else if (date.year == currentYear && date.month == currentMonth && date.day == (currentDay - 1)) {
                return '昨天';
            } else {
                return date.year + '/' + date.month + '/' + date.day;
            }
        }
    }
    // 比较两个日期
    static compareTo(date1, date2, compare_enum) {
        if (date1.year > date2.year) {
            if (compare_enum == COMPARE_ENUM.MORE) {
                return date1;
            }
            return date2;
        }
        else if (date1.year < date2.year) {
            if (compare_enum == COMPARE_ENUM.MORE) {
                return date2;
            }
            return date1;
        }
        else if (date1.year == date2.year) {
            if (date1.week > date2.week) {
                if (compare_enum == COMPARE_ENUM.MORE) {
                    return date1;
                }
                return date2;
            }
            else if (date1.week < date2.week) {
                if (compare_enum == COMPARE_ENUM.MORE) {
                    return date2;
                }
                return date1;
            }
        }
        return date1;
    }
    // 返回具体描述信息
    static getRemarkDeatilWithDate(date) {
        let str = DateManager.getFormatDate(date.year) + '年' + 
                  DateManager.getFormatDate(date.month) + '月' + 
                  DateManager.getFormatDate(date.day) + '日  星期' +
                  DateManager.getWeekday(date.year, date.month-1, date.day);
        return str;
    }
}