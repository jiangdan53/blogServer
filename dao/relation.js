const blogClass = require('./model/blogClassModel');
const blogtype = require('./model/blogTypeModel');
const blogs = require('./model/blogModel');
// 现在我们参数中传递的foreignKey 是我们的外键名称 当我们从父类模型中·取查找时 父类依据我们的foreignKey查找 当从子类模型中去联合查询时 子类模型回将我们的foreignKey作为我们查询的依据 
// 如果我们在绑定foreignKey 子查父一对一关系时 我们如果绑定的是父类的主键那么我们将无法将没一个子类对应的父类一一对应 他是会依此将所有的父类中的元素一个一个的放入到子类查询的结果中 
// 例如 我们想要查询 A 这个父类中对应B这个子类中的name时 现在是我们的一个父类name对应3个子类条数 父类一共有3个 子类个数为9 那么我们将 
// blogtype.belongsTo(blogClass,{foreignKey:'id'}); foreignKey 绑定为父类的id 就会出现这样的结果 
/**
 * [
 * {
 * id:1,
 * name:'子类的name 我的父类那么应该是A1',
 * A:{
 * name:"A1"
 * }
 * },
 * {
 * id:1,
 * name:'子类的name 我的父类那么应该是A1',
 * A:{
 * name:"A2"
 * }
 * },
 * {
 * id:1,
 * name:'子类的name 我的父类那么应该是A1',
 * A:{
 * name:"A3"
 * }
 * },
 * {
 * id:1,
 * name:'子类的name 我的父类那么应该是A2',
 * A:null
 * }
 * ]
 * 这就是我们的查询结果 那么也就是说当我们绑定错误后我们的父类数据将会更具当前父类条数依此填充到我们子类查询结果中 结果是混乱的 而父类长度也只有三 所以只有查询结果中的前三项有父类的数据 而其他的没有 
 */
blogClass.hasMany(blogtype,{foreignKey:'blogId'}); //一个分类有多个小类
blogtype.belongsTo(blogClass,{foreignKey:'blogId'}); // 多个小类属于一个分类下的
blogClass.hasMany(blogs,{foreignKey:'classTotal'});
blogs.belongsTo(blogtype,{as:'category' ,foreignKey:'articleClassId',targetKey:'id'})
