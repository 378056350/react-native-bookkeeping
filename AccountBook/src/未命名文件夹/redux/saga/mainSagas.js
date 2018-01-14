import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  addCate,
  removeCate,
  getCateWithIndex,
  getDeleteCateWithIndex,

  getData,
  getDataRange,
} from '../../common/StorageManager/DataApi';

//======================== 分类 ========================//
// 刷新分类
function* refreshCateDataSaga() {
  const [currentInData, deleteInData] = yield [call(getCateWithIndex, 0), call(getDeleteCateWithIndex, 0)];
  yield put({type: 'writeCurrentInDataAction', data: currentInData});
  yield put({type: 'writeDeleteInDataAction', data: deleteInData});

  const [currentExData, deleteExData] = yield [call(getCateWithIndex, 1), call(getDeleteCateWithIndex, 1)];
  yield put({type: 'writeCurrentExDataAction', data: currentExData});
  yield put({type: 'writeDeleteExDataAction', data: deleteExData});

  yield put({type: 'refreshCateDataAction'});
}
// 添加分类
function* addCurrentCateDataSaga(ret) {
  // 添加数据
  yield call(addCate, ret.data);
  // 刷新数据
  yield call(refreshCateDataSaga);
}
// 删除分类
function* deleteCurrentCateDataSaga(ret) {
  // 删除数据
  yield call(removeCate, ret.data);
  // 刷新数据
  yield call(refreshCateDataSaga);
}

// 刷新分类
export function* refreshCateDataSagas() {
  yield* takeLatest("refreshCateDataSaga", refreshCateDataSaga);
}
// 添加分类
export function* addCurrentCateDataSagas() {
  yield* takeLatest("addCurrentCateDataSaga", addCurrentCateDataSaga);
}
// 删除分类
export function* deleteCurrentCateDataSagas() {
  yield* takeLatest("deleteCurrentCateDataSaga", deleteCurrentCateDataSaga);
}


//======================== 数据 ========================//
// 初始化数据
function* initializationDataRangeSaga() {
  // 获取数据
  const currentData = yield call(getData);
  // 计算当前显示
  const rangeData = yield call(getDataRange, currentData);
  var arr = [];
  var maxArr = {};
  var maxMoney = 0, subMoney = 0, avgMoney = 0;
  for (let i=0; i<currentData.data.length; i++) {
    // 当前时间
    if (i == 0) {
      if (currentData.data[i].year == rangeData.currentSubDateValue[0].year &&
          currentData.data[i].week == rangeData.currentSubDateValue[0].week) {
        arr.push(currentData.data[i]);
      }
    } else if (i== 1) {
      if (currentData.data[i].year == rangeData.currentSubDateValue[1].year &&
          currentData.data[i].month == rangeData.currentSubDateValue[1].month) {
        arr.push(currentData.data[i]);
      }
    } else if (i == 2) {
      if (currentData.data[i].year == rangeData.currentSubDateValue[2].year) {
        arr.push(currentData.data[i]);
      }
    }
  }

  for (let i=0; i<arr.length; i++) {
    // 最大值
    var current = maxArr[arr[i].year+"-"+arr[i].month+"-"+arr[i].day];
    if (current == undefined) {
      maxArr[arr[i].year+"-"+arr[i].month+"-"+arr[i].day] = parseFloat(arr[i].money);
    } else {
      maxArr[arr[i].year+"-"+arr[i].month+"-"+arr[i].day] = current + parseFloat(arr[i].money);
    }
    // 总和
    subMoney = subMoney + parseFloat(arr[i].money);
  }
  // 平均值
  avgMoney = subMoney / arr.length;
  for (x in maxArr) {
    if (maxArr[x] > maxMoney) {
      maxMoney = maxArr[x];
    }
  }

  for (let i=0; i<arr.length; i++) {
    arr[i].percent = arr[i].money / maxMoney;
  }

  // 赋值数据
  yield put({
    type: 'initializationDataRangeAction', 
    currentData: {'data': arr, 'max': maxMoney, 'sub': subMoney, 'avg': avgMoney, 'dateData': maxArr},
    currentSubDateRange: rangeData.currentSubDateRange,
    currentSubDateValue: rangeData.currentSubDateValue
  });
}
// 刷新数据
function* refreshDataRangeSaga(ret) {
  const currentData = yield call(getData);
  var arr = [];
  var maxArr = {};
  var maxMoney = 0, subMoney = 0, avgMoney = 0;
  for (let i=0; i<currentData.data.length; i++) {
    if (ret.index == 0) {
      if (currentData.data[i].year == ret.data[0].year &&
          currentData.data[i].week == ret.data[0].week) {
        arr.push(currentData.data[i]);
      }
    } else if (ret.index == 1) {
      if (currentData.data[i].year == ret.data[1].year &&
          currentData.data[i].month == ret.data[1].month) {
        arr.push(currentData.data[i]);
      }
    } else if (ret.index == 2) {
      if (currentData.data[i].year == ret.data[2].year) {
        arr.push(currentData.data[i]);
      }
    }
  }
  for (let i=0; i<arr.length; i++) {
    // 最大值
    var current = maxArr[arr[i].year+"-"+arr[i].month+"-"+arr[i].day];
    if (current == undefined) {
      maxArr[arr[i].year+"-"+arr[i].month+"-"+arr[i].day] = parseFloat(arr[i].money);
    } else {
      maxArr[arr[i].year+"-"+arr[i].month+"-"+arr[i].day] = current + parseFloat(arr[i].money);
    }
    // 总和
    subMoney = subMoney + parseFloat(arr[i].money);
  }
  // 平均值
  avgMoney = subMoney / arr.length;
  for (x in maxArr) {
    if (maxArr[x] > maxMoney) {
      maxMoney = maxArr[x];
    }
  }
  for (let i=0; i<arr.length; i++) {
    arr[i].percent = arr[i].money / maxMoney;
  }


  const rangeData = yield call(getDataRange, currentData);
  var dataArr1 = rangeData.currentSubDateRange[1][0];
  for (let i=0; i<dataArr1.length; i++) {
    if (dataArr1[i].year == ret.data[0].year && 
        dataArr1[i].week == ret.data[0].week) {
      rangeData.currentSubDateValue[0].index = i;
      rangeData.currentSubDateValue[0].year = dataArr1[i].year;
      rangeData.currentSubDateValue[0].week = dataArr1[i].week;
    }
  }
  var dataArr2 = rangeData.currentSubDateRange[1][1];
  for (let i=0; i<dataArr2.length; i++) {
    if (dataArr2[i].year == ret.data[1].year && 
        dataArr2[i].month == ret.data[1].month) {
      rangeData.currentSubDateValue[1].index = i;
      rangeData.currentSubDateValue[1].year = dataArr2[i].year;
      rangeData.currentSubDateValue[1].month = dataArr2[i].month;
    }
  }
  var dataArr3 = rangeData.currentSubDateRange[1][2];
  for (let i=0; i<dataArr3.length; i++) {
    if (dataArr3[i].year == ret.data[2].year) {
        rangeData.currentSubDateValue[2].index = i;
        rangeData.currentSubDateValue[2].year = dataArr3[i].year;
    }
  }

  

  // 赋值数据
  yield put({
    type: 'initializationDataRangeAction', 
    currentData: {'data': arr, 'max': maxMoney, 'sub': subMoney, 'avg': avgMoney, 'dateData': maxArr},
    currentSubDateRange: rangeData.currentSubDateRange,
    currentSubDateValue: rangeData.currentSubDateValue
  });
}
// 修改数据
function* changeDataRangeSaga(ret) {
  var index = ret.index;
  var data = ret.data;
  if (ret.subindex != undefined) {
    data[index].index = ret.subindex;
    if (index == 0) {
      data[index].index = ret.subindex;
      data[index].year = ret.subdata[1][index][ret.subindex].year;
      data[index].week = ret.subdata[1][index][ret.subindex].week;
    } else if (index == 1) {
      data[index].index = ret.subindex;
      data[index].year = ret.subdata[1][index][ret.subindex].year;
      data[index].month = ret.subdata[1][index][ret.subindex].month;
    } else if (index == 2) {
      data[index].index = ret.subindex;
      data[index].year = ret.subdata[1][index][ret.subindex].year;
    }
  }
  yield put({
    type: 'refreshDataRangeSaga', 
    index: index, 
    data: data
  });
  yield put({
    type: 'changeDataRangeAction', 
    index: index, 
    data: data
  });
}




// 初始化数据
export function* initializationDataRangeSagas() {
  yield* takeLatest("initializationDataRangeSaga", initializationDataRangeSaga);
}
// 初始化数据
export function* refreshDataRangeSagas() {
  yield* takeLatest("refreshDataRangeSaga", refreshDataRangeSaga);
}
// 修改数据
export function* changeDataRangeSagas() {
  yield* takeLatest("changeDataRangeSaga", changeDataRangeSaga);
}