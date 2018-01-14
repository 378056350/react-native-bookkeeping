
// 首页Action
let actions = {
    // 显示打卡
    showPunchAction: ()=>({
        type: "showPunchAction",
    }),
    // 隐藏打卡
    hidePunchAction: ()=>({
        type: "hidePunchAction",
    }),

    // 显示分享
    showShareAction: (name)=>({
        type: "showShareAction",
        name: name,
    }),
    // 隐藏分享
    hideShareAction: ()=>({
        type: "hideShareAction",
    }),

    // 显示截图分享
    showScreenShortAction: ()=>({
        type: "showScreenShortAction",
    }),
    // 隐藏截图分享
    hideScreenShortAction: ()=>({
        type: "hideScreenShortAction",
    }),
    
    // 类别设置显示
    categorySetAction: (index)=>({
        type: "categorySetAction",
        index: index,
    }),
    
    
    // 新增类别当前显示
    addCateShowCurrentAction: (data)=>({
        type: "addCateShowCurrentAction",
        data: data,
    }),
    // 新增类别当前显示文本
    addCateShowTextAction: (text)=>({
        type: "addCateShowTextAction",
        text: text,
    }),
    
    
}

export default actions;