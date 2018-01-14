import StorageManager from './StorageManager';
import DateManager from '../DateManager/DateManager';

export const DATA_TABLE = 'DATATABLE'; 
export const DATA_TABLE_MAX = 'DATATABLEMAX'; 

export default class SavaDataManager {

  static initialization() {
    storage.getAllDataForKey(DATA_TABLE).then(categorys => {
      if (categorys.length == 0) {
        SavaDataManager.saveMaxId({'maxId': 0});
      }
    })
  }

  /**
   * 增
   * @param {integer} sectionId
   * @param {string} name 
   * @param {string} remark 
   * @param {integer} year 
   * @param {integer} month 
   * @param {integer} week 
   * @param {integer} day 
   * @param {date} date 
   * @param {string} money 
   */
  static add(sectionId, name, remark, year, month, day, money) {
    let week = DateManager.getWeekNumber(year, month, day);
    SavaDataManager.loadMaxId(DATA_TABLE_MAX, (maxId)=>{
      StorageManager.saveWithKeyAndId(DATA_TABLE, maxId + 1, {
        'id':     maxId + 1, 
        'sectionId': sectionId,
        'name':   name, 
        'remark': remark,
        'year':   year,
        'month':  month,
        'week':   week,
        'day':    day,
        'money':  money,
      }, null);
      SavaDataManager.saveMaxId({'maxId': (maxId + 1)})
    });
  }
  // 删
  static remove(id) {
    storage.remove({
      key: DATA_TABLE,
      id: id
    });
  }
  // 改
  static replace(id, sectionId, name, remark, year, month, day, money) {
    let week = DateManager.getWeekNumber(year, month, day);
    StorageManager.saveWithKeyAndId(DATA_TABLE, id, {
      'id':     id, 
      'sectionId': sectionId,
      'name':   name, 
      'remark': remark,
      'year':   year,
      'month':  month,
      'week':   week,
      'day':    day,
      'money':  money,
    }, null);
  }
  // 查
  static get(success, fail) {
    storage.getAllDataForKey(DATA_TABLE).then(categorys => {
      if (success) {
        success(categorys);
      }
    });
  }
  
  // 读取id
  static loadMaxId(table, success, fail) {
    StorageManager.loadWithKey(DATA_TABLE_MAX, success, fail);
  }
  // 保存id
  static saveMaxId(id) {
    SavaDataManager.loadMaxId(DATA_TABLE_MAX, (data)=>{
      if (parseInt(id.maxId) >= parseInt(data)) {
        StorageManager.saveWithKey(DATA_TABLE_MAX, id.maxId, null);
      }
    },(err)=>{
      StorageManager.saveWithKey(DATA_TABLE_MAX, id.maxId, null);
    })
  }

  // 获取时间范围
  static getDataRange(data, finish) {
    var yearText  = [];
    var monthText = [];
    var weekText  = [];
    var yearDate  = [];
    var monthDate = [];
    var weekDate  = [];
    var yearData  = undefined;
    var monthData = undefined;
    var weekData  = undefined;
    var currentDateRangeIndexTwo = [];
    var now = new Date();
    var maxData = {
      "year":DateManager.getYear(now),
      "month":DateManager.getMonth(now),
      "week":DateManager.getWeekNumber(DateManager.getYear(now),DateManager.getMonth(now),now.getDate()),
      "day":now.getDate()
    };
    var minData = data.minData == undefined ? maxData : data.minData;
    for (let year=minData.year; year<=maxData.year; year++) {
      // 年
      if (year == maxData.year - 1) {
        yearText.push('去年');
      } else if (year == maxData.year) {
        yearText.push('今年');
      } else {
        yearText.push(year+'年');
      }
      yearDate.push({'year': year});
      if (year == maxData.year) {
        yearData = {
          'year': year, 
          'index': year-minData.year
        }
      }

      // 月
      var startMonth = 1;
      var endMonth = 12;
      if (minData.year == maxData.year) {
        startMonth = minData.month;
        endMonth = maxData.month;
      }
      else if (year == maxData.year) {
        endMonth = maxData.month;
      } 
      else if (year == minData.year) {
        startMonth = minData.month;
      }

      for (let month=startMonth; month<=endMonth; month++) {
        if (year == maxData.year) {
          if (month == maxData.month - 1) {
            monthText.push('上月');
          } else if (month == maxData.month) {
            monthText.push('本月');
          } else {
            monthText.push(month + '月');
          }
        } else {
          monthText.push(year + '-' + month + '月');
        }
        monthDate.push({'year': year, 'month': month});
        if (year == maxData.year && month == maxData.month) {
          monthData = {
            'year': year, 
            'month': maxData.month, 
            'index': monthDate.length-1
          }
        }
      }

      // 周
      if (year == maxData.year) {
        let start = minData.year == maxData.year ? minData.week : 1;
        for (let week=start; week<=maxData.week; week++) {
          if (week == maxData.week - 1) {
            weekText.push('上周')
          } else if (week == maxData.week) {
            weekText.push('本周')
          } else {
            weekText.push(week+'周')
          }
          weekDate.push({'year': year, 'week': week})
          if (year == maxData.year && week == maxData.week) {
            weekData = {
              'year': year, 
              'week': maxData.week, 
              'index': weekDate.length-1
            }
          }
        }
      } 
      else if (year == minData.year) {
        for (let week=minData.week; week<=52; week++) {
          weekText.push(year+'-'+week+'周')
          weekDate.push({'year': year,'week': week})
        }
      }
      else {
        for (let week=1; week<=52; week++) {
          weekText.push(year+'-'+week+'周')
          weekDate.push({'year': year, 'week': week})
        }
      }
    }
    if (finish) {
      finish({
        currentSubDateRange: [
          [
            weekText,
            monthText,
            yearText,
          ],
          [
            weekDate,
            monthDate,
            yearDate,
          ]
        ],
        currentSubDateValue: [
          weekData,
          monthData,
          yearData
        ]
      });
    }
  }

  // 获取最大时间
  static getMaxDate(date1, date2) {
    if (date1.year > date2.year) {
      return date1;
    } else if (date1.year < date2.year) {
      return date2;
    } else if (date1.year == date2.year) {
      if (date1.month > date2.month) {
        return date1;
      } else if (date1.month < date2.month) {
        return date2;
      } else if (date1.month == date2.month) {
        if (date1.day > date2.day) {
          return date1;
        } else if (date1.day < date2.day) {
          return date2;
        } else if (date1.day == date2.day) {
          return date1;
        }
      }
    }
  }
  // 获取最小时间
  static getMinDate(date1, date2) {
    if (date1.year > date2.year) {
      return date2;
    } else if (date1.year < date2.year) {
      return date1;
    } else if (date1.year == date2.year) {
      if (date1.month > date2.month) {
        return date2;
      } else if (date1.month < date2.month) {
        return date1;
      } else if (date1.month == date2.month) {
        if (date1.day > date2.day) {
          return date2;
        } else if (date1.day < date2.day) {
          return date1;
        } else if (date1.day == date2.day) {
          return date1; 
        }
      }
    }
  }


}