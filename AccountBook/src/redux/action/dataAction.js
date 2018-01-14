

let actions = {
    
    // 初始化分类数据
    initializationDataSaga: ()=>({
        type: "initializationDataSaga",
    }),
    // 记账
    saveAccountSaga: (data)=>({
        type: "saveAccountSaga",
        data: data,
    }),

}


export default actions;



// 我的
// isPunch          是否打卡
// isSound          是否声音
// isDetail         是否明细详情
// punchContinuous  打卡连续天数
// punchTotal       打卡总天数
// punchNumber      打卡总笔数

// 发现
// currentMonth         当前月份
// currentIncome        当前收入
// currentExpenditure   当前支出






// 分类
/**
 * 初始化
 * 1.初始化表A
 * 2.初始化表B
 * 3.添加默认数据到表A
 */
/**
 * 添加分类
 * 1.添加分类到表A
 * 2.如果分类在表B,删除分类从表B
 */
/**
 * 删除分类
 * 1.删除分类到表A
 * 2.删除该分类所有数据
 * 3.如果分类是默认分类,添加分类到表B
 */
/**
 * 切换分类位置
 * 1.两条分类切换位置
 */

// 数据
/**
 * 添加数据
 * 1.添加数据到表A
 */
/**
 * 删除数据
 * 1.删除数据从表A
 */
/**
 * 修改数据
 * 1.修改数据从表A
 */
/**
 * 获取全部数据
 * 1.获取全部数据
 */

// 其他数据
// 存储记账总天数
// 存储记账总笔数
// 存储记账连续天数
// 更新是否声音开关
// 更新是否明细详情



