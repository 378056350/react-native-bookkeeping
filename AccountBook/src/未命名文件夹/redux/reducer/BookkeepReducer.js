
import Immutable from 'immutable';

const initialState = {  
    // 是否显示HUD
    showInEx: 0,
}  

const reducer = (state = initialState, action) => {
    switch (action.type) {   
        // 显示HUD
        case 'showInEx': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                showInEx: action.inEx,
            });
            return state.toJS()    // 转回原生js
        }   
        default: 
            return state;  
    }  

}  

export default reducer;