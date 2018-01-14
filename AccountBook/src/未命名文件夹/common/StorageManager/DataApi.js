
import SaveCateManager from './SaveCateManager';
import SaveDataManager from './SaveDataManager';

//========================= 分类 =========================//
// 分类 - 增
export function addCate(data) {
  return new Promise((resolve) => {
    SaveCateManager.addCate(data.name, data.inEx, data.isDefault, data.icon, data.iconL, data.iconS);
    setTimeout(()=>{
      resolve();
    }, 1000)
  });
}

// 分类 - 删
export function removeCate(data) {
  return new Promise((resolve) => {
    SaveCateManager.removeCate(data);
    resolve();
  });
}

// 分类 - 改
export function getCateWithIndex(index) {
  return new Promise((resolve) => {
    SaveCateManager.getCateWithInex(index, (data)=>{
      resolve(data);
    });
  });
}

// 删除 - 查
export function getDeleteCateWithIndex(index) {
  return new Promise((resolve) => {
    SaveCateManager.getDeleteCateWithInex(index, (data)=>{
      resolve(data);
    });
  });
}



//========================= 数据 =========================//
// 获取数据
export function getData() {
  return new Promise((resolve) => {
    SaveDataManager.get((data)=>{
      var maxData = data[0], minData = data[0];
      for (let i=1; i<data.length; i++) {
        maxData = SaveDataManager.getMaxDate(maxData, data[i]);
        minData = SaveDataManager.getMinDate(minData, data[i]);
      }
      resolve({
        'data': data, 
        'maxData': maxData,
        'minData': minData,
      });
    });
  });
}
// 获取数据范围
export function getDataRange(data) {
  return new Promise((resolve) => {
    SaveDataManager.getDataRange(data, (ret)=>{
      resolve(ret);
    });
  });
}



