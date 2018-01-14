
import Immutable from 'immutable';
import { Save } from '../../common/index';

const initialState = {  
    category: [[[],[]],[[],[]]],
    account: [],
    homeYear: 0,
    homeMonth: 0,
    homeData: {param: [], range: []},
    chartData: [
        [[],[],[{remark: '本周'}]],
        [[],[],[{remark: '本月'}]],
        [[],[],[{remark: '本年'}]]
    ]
}  

const reducer = (state = initialState, action) => {
    switch (action.type) { 
        case 'initializationDataAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                category: action.category,
                account: action.account,
                homeYear: action.homeYear,
                homeMonth: action.homeMonth,
                homeData: action.homeData,
                chartData: action.chartData,
            });
            return state.toJS()    // 转回原生js
        }   
        case 'saveAccountAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                account: action.data
            });
            return state.toJS()    // 转回原生js
        }   
        case 'updateAccount': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                // account: action.data
            });
            return state.toJS()    // 转回原生js
        }   
        default: 
            return state;  
    }  

}  

export default reducer;