import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Save, DateManager } from '../../common/index';
import {
    initialization,
    loadAccount,
    loadCategory,
    saveAccount,
    arrangeHomeData,
    arrangeChartData,
} from './DataApi';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 初始化
function* initializationDataSaga(ret) {
    // 数据库
    yield call(initialization);
    yield call(delay, 1000)
    // 分类, 记账
    const [category, account] = yield [
        call(loadCategory),
        call(loadAccount)
    ]
    // 首页年, 月
    const homeYear = DateManager.getYear(); 
    const homeMonth = DateManager.getMonth();
    // 整理
    const [homeData, chartData] = yield [
        call(arrangeHomeData, account),
        call(arrangeChartData, account),
    ]
    // 初始化
    yield put({
        type: 'initializationDataAction', 
        category: category,
        account: account,
        homeYear: homeYear,
        homeMonth: homeMonth,
        homeData: homeData,
        chartData: chartData,
    });
}
// 记账
function* saveAccountSaga(ret) {
    // 保存数据
    yield call(saveAccount, ret.data);
    yield call(delay, 1000)
    // 获取全部数据
    const [category, account] = yield [
        call(loadCategory),
        call(loadAccount)
    ]
    // 首页年, 月
    const homeYear = DateManager.getYear(); 
    const homeMonth = DateManager.getMonth();
    // 整理
    const [homeData, chartData] = yield [
        call(arrangeHomeData, account),
        call(arrangeChartData, account),
    ]
    // 初始化
    yield put({
        type: 'initializationDataAction', 
        category: category,
        account: account,
        homeYear: homeYear,
        homeMonth: homeMonth,
        homeData: homeData,
        chartData: chartData,
    });
}
// 更新数据范围
function* updateDateSaga(ret) {

}


export function* saveAccountSagas() {
    yield* takeLatest("saveAccountSaga", saveAccountSaga);
}
export function* initializationDataSagas() {
    yield* takeLatest("initializationDataSaga", initializationDataSaga);
}