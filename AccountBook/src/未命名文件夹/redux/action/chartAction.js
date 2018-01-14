
// 首页Action
let actions = {
    // 显示HUD
    showChartHudAction: (chartHudLeft, chartHudTop, currentChartPoint)=>({
        type: "showChartHudAction",
        chartHudLeft: chartHudLeft,
        chartHudTop: chartHudTop,
        currentChartPoint: currentChartPoint,
    }),
    // 隐藏HUD
    hideChartHudAction: ()=>({
        type: "hideChartHudAction",
    }),
    // 设置圆心点位置
    setChartPointAction: (chartPointCenters)=>({
        type: "setChartPointAction",
        chartPointCenters: chartPointCenters,
    }),


    



    // // 修改当前日期范围
    // changeDateRangeSaga: (date, subDate)=>({
    //     type: "changeDateRangeSaga",
    //     date: date,
    //     subDate: subDate,
    // }),
    // changeDateRangeAction: (date, subDate)=>({
    //     type: "changeDateRangeAction",
    //     date: date,
    //     subDate: subDate,
    // }),
    // changeDataAction: (data)=>({
    //     type: "changeDataAction",
    //     data: data,
    // }),
}

export default actions;