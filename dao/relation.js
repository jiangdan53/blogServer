const blogClass = require('./model/blogClassModel');
const blogtype = require('./model/blogTypeModel');
const blogs = require('./model/blogModel');
blogClass.hasMany(blogtype,{foreignKey:'blogId'}); //一个分类有多个小类
blogtype.belongsTo(blogClass,{foreignKey:'id'}); // 多个小类属于一个分类下的
blogClass.hasMany(blogs,{foreignKey:'classTotal'});
blogs.belongsTo(blogtype,{as:'category' ,foreignKey:'articleClassId',targetKey:'id'})
