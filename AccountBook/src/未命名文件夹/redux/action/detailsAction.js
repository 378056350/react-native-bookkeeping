
// 首页Action
let actions = { 
    // 更改当前移动方向
    changeTableMoveY: (tableMoveY)=>({
        type: "changeTableMoveY",
        tableMoveY: tableMoveY,
    }),
    // 改变当前显示table
    changeTableDisplay: ()=>({
        type: "changeTableDisplay",
    }),
    // 开始更改table 
    startTableChange: ()=>({
        type: "startTableChange",
    }),
    
}

export default actions;