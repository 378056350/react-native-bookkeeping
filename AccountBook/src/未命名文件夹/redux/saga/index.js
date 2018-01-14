import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { 
  // 分类
  refreshCateDataSagas,
  addCurrentCateDataSagas,
  deleteCurrentCateDataSagas,
  // 数据
  initializationDataRangeSagas,
  refreshDataRangeSagas,
  changeDataRangeSagas
} from './mainSagas';

function* saga() {
  yield [
    // 分类
    call(refreshCateDataSagas),
    call(addCurrentCateDataSagas),
    call(deleteCurrentCateDataSagas),
    // 数据
    call(initializationDataRangeSagas),
    call(refreshDataRangeSagas),
    call(changeDataRangeSagas),
  ]
}

export default saga;