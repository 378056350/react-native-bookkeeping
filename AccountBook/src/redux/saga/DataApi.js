
import { Save } from '../../common/index';

//========================= 分类 =========================//
// 初始化
export function initialization() {
    return new Promise((resolve) => {
        Save.initialization();
        resolve();
    });
}
// 读取分类
export function loadCategory() {
    return new Promise((resolve) => {
        let data = Save.getCategory();
        resolve(data);
    });
}
// 读取记账
export function loadAccount() {
    return new Promise((resolve) => {
        let data = Save.loadAccount();
        resolve(data);
    });
}
// 整理首页
export function arrangeHomeData(data) {
    return new Promise((resolve) => {
        let homes = Save.arrangeHomeData(data);
        resolve(homes);
    });
}
// 整理图表
export function arrangeChartData(data) {
    return new Promise((resolve) => {
        let charts = Save.arrangeChartData(data);
        resolve(charts);
    });
}
// 保存记账
export function saveAccount(data) {
    return new Promise((resolve) => {
        Save.saveAccount(data);
        resolve();
    });
}



