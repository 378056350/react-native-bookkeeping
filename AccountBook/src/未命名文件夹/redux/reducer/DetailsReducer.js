
import Immutable from 'immutable';

const initialState = {  
    // 当前显示
    tableDisplay: 0,
    // 当前移动: 0下移, 1上移
    tableMoveY: 0,
    // 是否在更改中
    isTableAnimating: false,
    // 是否允许更新
    isTableAllowUpdate: false,
}  

const reducer = (state = initialState, action) => {
    switch (action.type) {   
        // 更改当前移动方向
        case 'changeTableMoveY': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                tableMoveY: action.tableMoveY,
            });
            return state.toJS()    // 转回原生js
        }   
        // 更改当前显示table
        case 'changeTableDisplay': {
            let display = state.tableDisplay + 1;
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                tableDisplay: display,
                isTableAnimating: false,
            });
            return state.toJS()    // 转回原生js
        }   
        // 开始更改table 
        case 'startTableChange': {
            let display = state.tableDisplay + 1;
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isTableAnimating: true,
            });
            return state.toJS()    // 转回原生js
        }   
        default: 
            return state;  
    }  

}  

export default reducer;