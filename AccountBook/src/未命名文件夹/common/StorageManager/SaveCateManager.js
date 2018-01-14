import StorageManager from './StorageManager';
import { categoryJson } from '../../assets/json/categoryJson';
import { addCategoryJson } from '../../assets/json/addCategoryJson';

export const CATEGORY_TABLE = 'CATEGORYTABLE'; 
export const CATEGORY_TABLE_MAX = 'CATEGORYTABLEMAX'; 
export const CATEGORY_NEW_TABLE = 'CATEGORYNEWTABLE'; 
export const CATEGORY_NEW_TABLE_MAX = 'CATEGORYNEWTABLEMAX'; 
export const CATEGORY_DELETE_TABLE = 'CATEGORYDELETETABLE'; 
export const CATEGORY_DELETE_TABLE_MAX = 'CATEGORYDELETETABLEMAX'; 


export default class SaveCateManager {

  // 初始化
  static initialization() {
    // 获取默认类别
    storage.getAllDataForKey(CATEGORY_TABLE).then(categorys => {
      // 没有数据则初始化
      if (categorys.length == 0) {
        SaveCateManager.initializationCategory();
        SaveCateManager.saveMaxId(CATEGORY_TABLE_MAX, {'maxId': 37});
        SaveCateManager.saveMaxId(CATEGORY_DELETE_TABLE_MAX, {'maxId': 0});
      }
    })
    // 获取新增类别
    storage.getAllDataForKey(CATEGORY_NEW_TABLE).then(categorys => {
      // 没有数据则初始化
      if (categorys.length == 0) {
        SaveCateManager.initializationAddCategory();
      }
    });
  }
  // 当前
  static initializationCategory() {
    // 存储数据
    for (let i=0; i<categoryJson.length; i++) {
      StorageManager.saveWithKeyAndId(CATEGORY_TABLE, categoryJson[i].id, {
        'id':    categoryJson[i].id,
        'row':   categoryJson[i].id, 
        'name':  categoryJson[i].name,
        'inEx':  categoryJson[i].inEx,
        'icon':  categoryJson[i].icon,
        'isDefault': categoryJson[i].isDefault,
      }, null);
    }
  }
  // 新增
  static initializationAddCategory() {
    // 存储数据
    for (let i=0; i<addCategoryJson.length; i++) {
      StorageManager.saveWithKeyAndId(CATEGORY_NEW_TABLE, addCategoryJson[i].id, {
        'id':    addCategoryJson[i].id,
        'name':  addCategoryJson[i].name, 
        'icon':  addCategoryJson[i].icon,
      }, null);
    }
  }

  //======================= 当前 =======================//
  // 增
  static addCate(name, inEx, isDefault, icon, iconL, iconS) {
    SaveCateManager.getDeleteCateWithInex(inEx, (data)=>{
      // 以前被删除的类别
      for (let i=0; i<data.length; i++) {
        let subData = data[i];
        if (subData.name == name) {
          // 添加当前类别
          StorageManager.saveWithKeyAndId(CATEGORY_TABLE, subData.id, {
            'id':    subData.id, 
            'row':   subData.row, 
            'name':  subData.name,
            'inEx':  subData.inEx,
            'icon':  subData.icon,
            'isDefault': subData.isDefault,
          }, null);
          // 移除删除类别
          SaveCateManager.removeDeleteCate(subData);
          return;
        }
      }
      // 自定义类别
      SaveCateManager.loadMaxId(CATEGORY_TABLE_MAX, (maxId)=>{
        StorageManager.saveWithKeyAndId(CATEGORY_TABLE, maxId + 1, {
          'id':    maxId + 1, 
          'row':   maxId + 1, 
          'name':  name,
          'inEx':  inEx,
          'icon':  icon,
          'isDefault': isDefault,
        }, null);
        SaveCateManager.saveMaxId(CATEGORY_TABLE_MAX, {'maxId': (maxId + 1)});
      });
    });
  }
  // 删
  static removeCate(data) {
    if (data.isDefault == true) {
      SaveCateManager.addDeleteCate(data.id, data.row, data.name, data.inEx, data.isDefault, data.icon, data.iconL, data.iconS);
    }
    storage.remove({
      key: CATEGORY_TABLE,
      id: data.id
    });
  }
  // 查
  static getCate(finish) {
    storage.getAllDataForKey(CATEGORY_TABLE).then(categorys => {
      if (finish) {
        finish(categorys);
      }
    });
  }
  static getCateWithInex(inEx, finish) {
    inEx = inEx ? inEx : 0;
    SaveCateManager.getCate((categorys)=>{
      let arr = [];
      if (finish) {
        for (let i=0; i<categorys.length; i++) {
          let cate = categorys[i];
          if (cate.inEx == inEx) {
            arr.push(cate);
          }
        }
        finish(arr);
      }
    });
  }


  //======================= 删除 =======================//
  // 增
  static addDeleteCate(id, row, name, inEx, isDefault, icon, iconL, iconS) {
    StorageManager.saveWithKeyAndId(CATEGORY_DELETE_TABLE, id, {
      'id':    id, 
      'row':   row, 
      'name':  name,
      'inEx':  inEx,
      'icon':  icon,
      'isDefault': isDefault,
    }, null);
  }
  // 删
  static removeDeleteCate(data) {
    storage.remove({
      key: CATEGORY_DELETE_TABLE,
      id: data.id
    });
  }
  // 查
  static getDeleteCate(finish) {
    storage.getAllDataForKey(CATEGORY_DELETE_TABLE).then(categorys => {
      if (finish) {
        finish(categorys);
      }
    });
  }
  static getDeleteCateWithInex(inEx, finish) {
    inEx = inEx ? inEx : 0;
    SaveCateManager.getDeleteCate((categorys)=>{
      let arr = [];
      if (finish) {
        for (let i=0; i<categorys.length; i++) {
          let cate = categorys[i];
          if (cate.inEx == inEx) {
            arr.push(cate);
          }
        }
        finish(arr);
      }
    });
  }

  
  //======================= 新增 =======================//
  // 查
  static getNewCate(finish) {
    storage.getAllDataForKey(CATEGORY_NEW_TABLE).then(categorys => {
      if (finish) {
        finish(categorys);
      } 
    });
  }




  static loadMaxId(table, success, fail) {
    if (table == CATEGORY_TABLE_MAX) {
      StorageManager.loadWithKey(CATEGORY_TABLE_MAX, success, fail);
    } 
    else if (table == CATEGORY_DELETE_TABLE_MAX) {
      StorageManager.loadWithKey(CATEGORY_DELETE_TABLE_MAX, success, fail);
    } 
  }
  static saveMaxId(table, id) {
    if (table == CATEGORY_TABLE_MAX) {
      SaveCateManager.loadMaxId(CATEGORY_TABLE_MAX, (data)=>{
        if (parseInt(id.maxId) >= parseInt(data)) {
          StorageManager.saveWithKey(CATEGORY_TABLE_MAX, id.maxId, null);
        }
      },(err)=>{
        StorageManager.saveWithKey(CATEGORY_TABLE_MAX, id.maxId, null);
      })
    } 
    else if (table == CATEGORY_DELETE_TABLE_MAX) {
      SaveCateManager.loadMaxId(CATEGORY_DELETE_TABLE_MAX, (data)=>{
        if (parseInt(id.maxId) >= parseInt(data)) {
          StorageManager.saveWithKey(CATEGORY_DELETE_TABLE_MAX, id.maxId, null);
        }
      },(err)=>{
        StorageManager.saveWithKey(CATEGORY_DELETE_TABLE_MAX, id.maxId, null);
      })
    } 
  }

}