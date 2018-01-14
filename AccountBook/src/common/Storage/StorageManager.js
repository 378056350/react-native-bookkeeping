import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

class StorageManager {
  // 初始化
  static initialization() {
    var storage = new Storage({
      // 最大存储
      size: 10000,
      // 存储引擎
      storageBackend: AsyncStorage,
      // 数据过期时间
      defaultExpires: null,
      // 读写时在内存中缓存数据
      enableCache: true,
    })  
    global.storage = storage;
  }
  // 存值
  static saveWithKey(key, data, expires) {
    storage.save({
      key: key,
      data: data,
      expires: expires
    });
  }
  // 取值
  static loadWithKey(key, success, fail) {
    // 读取
    storage.load({
      key: key,
      autoSync: false,
      syncInBackground: true,
    }).then(ret => {
      if (success) {
        success(ret);
      }
    }).catch(err => {
      if (fail) {
        fail(err);
      }
    })
  }
}


export default StorageManager;