
// 首页Action
let actions = {

    //======================== 分类 ========================//
    // 刷新分类
    refreshCateDataSaga: (data)=>({
        type: "refreshCateDataSaga",
        data: data
    }),
    // 添加分类
    addCurrentCateDataSaga: (data)=>({
        type: "addCurrentCateDataSaga",
        data: data,
    }),
    // 删除分类
    deleteCurrentCateDataSaga: (data)=>({
        type: "deleteCurrentCateDataSaga",
        data: data,
    }),
    // 更新待写入分类
    updateCurrentCateDataAction: (data)=>({
        type: "updateCurrentCateDataAction",
        data: data,
    }),
    // 切换
    changeCateAction: (index)=>({
        type: "changeCateAction",
        index: index,
    }),
    // 添加数据
    writeCurrentInDataAction: (data)=>({
        type: "writeCurrentInDataAction",
        data: data,
    }),
    writeCurrentExDataAction: (data)=>({
        type: "writeCurrentExDataAction",
        data: data,
    }),
    writeDeleteDataInAction: (data)=>({
        type: "writeDeleteDataInAction",
        data: data,
    }),
    writeDeleteDataExAction: (data)=>({
        type: "writeDeleteDataExAction",
        data: data,
    }),

    //======================== 数据 ========================//
    // 初始化数据范围
    initializationDataRangeSaga: ()=>({
        type: "initializationDataRangeSaga",
    }),
    refreshDataRangeSaga: (data, index)=>({
        type: "refreshDataRangeSaga",
        data: data,
        index: index,
    }),
    initializationDataRangeAction: (data)=>({
        type: "initializationDataRangeAction",
        data: data,
    }),
    // 修改当前选择
    changeDataRangeSaga: (index, subindex, data, subdata)=>({
        type: "changeDataRangeSaga",
        index: index,
        subindex: subindex,
        data: data,
        subdata: subdata,
    }),
    changeDataRangeAction: (index, data)=>({
        type: "changeDataRangeAction",
        index: index,
        data: data,
    }),
    changeSubDataRangeAction: (data)=>({
        type: "changeSubDataRangeAction",
        data: data,
    }),
    // // 添加数据
    // addDataAction: ()=>({
    //     type: "changeDataRangeSaga",
    // }),

    

    // 值存储:
    // 当前选择项(周, 月, 年) currentIndex
    // 当前子选择项 currentSubIndex: [[2016,]]

    // 初始化数据
    // 1. 获取所有数据, 创建默认值
    // 2. 设置默认值给控件

    // 添加/删除/修改数据
    // 1. 获取所有数据, 计算值,
    // 2. 设置计算值给控件
    // 3. 设置当前选中的值给控件

}

export default actions;