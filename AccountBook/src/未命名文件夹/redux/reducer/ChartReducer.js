
import Immutable from 'immutable';

const initialState = {  
    // 是否显示HUD
    isShowChartHud: false,
    // HUD点个数
    chartHudCount: 31,
    // HUD的位置
    chartHudLeft: 0,
    chartHudTop: 0,
    // 圆心点位置:[[x,y],[x,y],[x,y]]
    chartPointCenters: [],
    // 当前选中点
    currentChartPoint: 0,
}  

const reducer = (state = initialState, action) => {
    switch (action.type) {   
        // 显示HUD
        case 'showChartHudAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isShowChartHud: true,
                chartHudLeft: action.chartHudLeft,
                chartHudTop: action.chartHudTop,
                currentChartPoint: action.currentChartPoint,
            });
            return state.toJS()    // 转回原生js
        }   
        // 隐藏HUD
        case 'hideChartHudAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isShowChartHud: false,
            });
            return state.toJS()    // 转回原生js
        }   
        // 设置圆心点位置
        case 'setChartPointAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                chartPointCenters: action.chartPointCenters,
            });
            return state.toJS()    // 转回原生js
        }

        // // 更新当前时间范围
        // case 'changeDateRangeAction': {
        //     state = Immutable.fromJS(state);   // 转成immutable
        //     state = state.merge({
        //         currentDateRangeIndex: action.date,
        //         currentSubDateRange: action.subDate
        //     });
        //     return state.toJS()    // 转回原生js
        // }

        // // 刷新数据
        // case 'refreshCurrentData': {
        //     state = Immutable.fromJS(state);   // 转成immutable
        //     state = state.merge({
        //         currentData: action
        //     });
        //     return state.toJS()    // 转回原生js
        // }

        default: 
            return state;  
    }  

}  

export default reducer;