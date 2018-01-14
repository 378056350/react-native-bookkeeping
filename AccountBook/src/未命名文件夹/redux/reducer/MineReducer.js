
import Immutable from 'immutable';

const initialState = {  
    //==================== 我的 ====================//
    // 是否打卡
    isPunch: false,
    // 显示打卡
    isShowPunch: false,
    // 显示分享
    isShowShare: false,
    // 显示截图分享
    isShowScreenShortShare: false,

    //==================== 分类 ====================//
    // 类别设置显示(0: 支出. 1: 收入)
    categorySetInEx: 0,
    
    
    //==================== 添加类别 =================//
    // 当前选择
    addCateCurrentData: {
                        "section": 0, 
                        "row": 0, 
                        "inEx": 0,
                        "isDefault": false,
                        "icon": require('../../assets/images/cc_entertainmente_game.png'), 
                        "iconL": require('../../assets/images/cc_entertainmente_game_l.png'), 
                        "iconS": require('../../assets/images/cc_entertainmente_game_s.png')
                    },
    // 当前输入文本
    addCateCurrentText: '',
}  

const reducer = (state = initialState, action) => {
    switch (action.type) {   
        // 显示打卡
        case 'showPunchAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isPunch: true,
                isShowPunch: true
            });
            return state.toJS()    // 转回原生js
        }  
        // 隐藏打卡
        case 'hidePunchAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isShowPunch: false,
            });
            return state.toJS()    // 转回原生js
        } 
        
        // 显示分享
        case 'showShareAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isShowShare: true,
                name: action.name,
            });
            return state.toJS()    // 转回原生js
        }  
        // 隐藏分享
        case 'hideShareAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isShowShare: false,
            });
            return state.toJS()    // 转回原生js
        }  
        
        // 显示截图分享
        case 'showScreenShortAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isShowScreenShortShare: true,
            });
            return state.toJS()    // 转回原生js
        }  
        // 隐藏截图分享
        case 'hideScreenShortAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                isShowScreenShortShare: false,
            });
            return state.toJS()    // 转回原生js
        }  
 
        // 类别设置显示
        case 'categorySetAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                categorySetInEx: action.index,
            });
            return state.toJS()    // 转回原生js
        }  


        // 类别设置显示
        case 'addCateShowCurrentAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                addCateCurrentData: action.data,
            });
            return state.toJS()    // 转回原生js
        }  
        // 类别设置文本
        case 'addCateShowTextAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                addCateCurrentText: action.text,
            });
            return state.toJS()    // 转回原生js
        }  





        default: 
            return state;  
    }  

}  

export default reducer;