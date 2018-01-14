
import { 
  CATEGORY_TABLE,
  CATEGORY_DELETE_TABLE,
  ACCOUNT_TABLE,
} from '../SaveManager/SaveEnum';

var Realm = require('realm');
var realm;
class RealmDemo {
  // 初始化数据
  static initialization() {
    // 分类, 被删除分类
    let category = [CATEGORY_TABLE, CATEGORY_DELETE_TABLE];
    let schemas = RealmDemo.initCategory();
    schemas.push(RealmDemo.initAccount())
    realm = new Realm({schema: schemas});
  }
  static initCategory() {
    let category = [CATEGORY_TABLE, CATEGORY_DELETE_TABLE];
    let schemas = [];
    for (let i=0; i<category.length; i++) {
      const schema = {
        name: category[i],
        primaryKey: 'id',    
        properties: {
          id: 'int',
          name: {type: 'string', default: ''},
          inEx: {type: 'int', default: 0},
          isDefault: {type: 'bool', default: false},
          icon: {type: 'int', default: 0},
        }
      };
      schemas.push(schema);
    }
    return schemas
  }
  static initAccount() {
    const schema = {
      name: ACCOUNT_TABLE,
      primaryKey: 'id',    
      properties: {
        id: 'int',
        sectionId: {type: 'int', default: 0},
        name:   {type: 'string', default: ''},
        remark: {type: 'string', default: ''},
        year:   {type: 'int', default: 0},
        month:  {type: 'int', default: 0},
        week:   {type: 'int', default: 0},
        day:    {type: 'int', default: 0},
        money:  {type: 'double', default: 0},
        inEx:   {type: 'int', default: 0},
      }
    };
    return schema;
  }
  
  static save(table, data) {
    realm.write(() => {
      realm.create(table, data);
    })
  }
  static load(table) {
    let tables = realm.objects(table);
    return tables;
  }
}

export default RealmDemo;