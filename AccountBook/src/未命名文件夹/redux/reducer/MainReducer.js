
import Immutable from 'immutable';

const initialState = {  
    //======================== 分类 ========================//
    // 刷新数据
    refreshDataCount: 0,
    // 支出 0/ 收入 1
    currentInExIndex: 0,
    // 当前
    currentCateData: [],
    currentCateDataWithIn: [],
    currentCateDataWithEx: [],
    // 删除
    deleteCateData: [],
    deleteCateDataWithIn: [],
    deleteCateDataWithEx: [],
    // 待添加数据
    addCurrentCateData: {
        "name": '',
        "section": 0, 
        "row": 0, 
        "inEx": 0,
        "isDefault": false,
        "icon": 38,
    },

    //======================== 数据 ========================//
    // 当前时间范围(周.月.年)
    currentDateRangeIndex: 0,
    currentSubDateRange: [],
    currentSubDateValue: [],
    // 当前时间数据
    currentData: [],

    // 
    
}  

const reducer = (state = initialState, action) => {
    switch (action.type) { 
        //======================== 分类 ========================//
        // 刷新数据
        case 'refreshCateDataAction': {
            let count = state.refreshDataCount + 1;
            let currentData = state.currentInExIndex == 0 ? state.currentCateDataWithIn : state.currentCateDataWithEx;
            let deleteData = state.currentInExIndex == 0 ? state.deleteCateDataWithIn : state.deleteCateDataWithEx;
            state = Immutable.fromJS(state); 
            state = state.merge({
                refreshDataCount: count,
                currentCateData: currentData,
                deleteCateData: deleteData,
            });
            return state.toJS()
        }
        // 切换
        case 'changeCateAction': {
            let currentData = action.index == 0 ? state.currentCateDataWithIn : state.currentCateDataWithEx;
            let deleteData = action.index == 0 ? state.deleteCateDataWithIn : state.deleteCateDataWithEx;
            let index = action.index;
            state = Immutable.fromJS(state); 
            state = state.merge({
                currentInExIndex: index,
                currentCateData: currentData,
                deleteCateData: deleteData,
            });
            return state.toJS()
        }
        // 更新待写入数据
        case 'updateCurrentCateDataAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                addCurrentCateData: action.data,
            });
            return state.toJS()
        }
        // 当前
        case 'writeCurrentInDataAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                currentCateDataWithIn: action.data
            });
            return state.toJS()
        }
        case 'writeCurrentExDataAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                currentCateDataWithEx: action.data
            });
            return state.toJS()
        }
        // 删除
        case 'writeDeleteInDataAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                deleteCateDataWithIn: action.data
            });
            return state.toJS()
        }
        case 'writeDeleteExDataAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                deleteCateDataWithEx: action.data
            });
            return state.toJS()
        }

        //======================== 数据 ========================//
        case 'initializationDataRangeAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                currentData: action.currentData,
                currentSubDateRange: action.currentSubDateRange,
                currentSubDateValue: action.currentSubDateValue,
            });
            return state.toJS()
        }
        case 'changeDataRangeAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                currentDateRangeIndex: action.index,
                currentSubDateValue: action.data,
            });
            return state.toJS()
        }
        case 'changeSubDataRangeAction': {
            state = Immutable.fromJS(state); 
            state = state.merge({
                currentSubDateValue: action.data,
            });
            return state.toJS()
        }


        default: 
            return state;  
    }  

}  

export default reducer;