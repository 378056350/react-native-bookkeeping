import StorageManager from './StorageManager';
import SaveCateManager from './SaveCateManager';
import SaveDataManager from './SaveDataManager';
import {iconJson} from '../../assets/json/iconJson'; 

export default class SaveManager {

  // 初始化
  static initialization() {
    StorageManager.initialization();
    SaveCateManager.initialization();
    SaveDataManager.initialization();
  }

  // index: 0普通, 1高亮, 2选中
  static getIconWithId(id, index) {
    let icons = iconJson[id];
    if (index == 0) {
      return icons.icon;
    }
    else if (index == 1) {
      return icons.iconL;
    }
    else if (index == 2) {
      return icons.iconS;
    }
  }



}