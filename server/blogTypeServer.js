const {addBlogType,getBlogs} = require('../dao/blogTypeDb');
const {OpObj} = require('../utils/returnArr')
exports.addBlogServer = async (obj)=>{
    obj = OpObj(obj,['name','order','articleCount','blogId'])
    // validate.validators 需要验证客户端传递的数据类型 是否正确 (待完成)
    return await addBlogType(obj)    
}
// 获取单个博客分类的所有文章
exports.getBlogAllServer = async (className)=>{
    return await getBlogs(className)
}
// 修改一个博客分类 
exports.updataBlogtype = async (id)=>{
return updataBlog()
}
// 删除一个博客分类 
exports.deleteBolgtype = async (id)=>{
// 首先验证该分类下是否存在文章 如果关联的分类下没有文章则能删除 否则不能
return deleteBlog(id)
}