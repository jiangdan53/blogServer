const {addBlogType,getBlogTypeAll,getblogTypeOne,updataBlogType,deleteBlogType} = require('../dao/blogTypeDb');
const {OpObj} = require('../utils/returnArr')
exports.addBlogServer = async (obj)=>{
    obj.articleCount = obj.articleCount || 0
    obj = OpObj(obj,['name','order','articleCount','blogId'])
    // validate.validators 需要验证客户端传递的数据类型 是否正确 (待完成)
    return await addBlogType(obj)    
}
// 获取单个博客分类的所有文章
exports.getBlogAllServer = async (obj)=>{
    obj.limit = (obj.limit || 10) * 1
    obj.pageIndex = (obj.pageIndex || 1) * 1
    return await getBlogTypeAll(obj)
}
// 获取一个博客分类
exports.getblogTypeOneServer = async (id)=>{
    return await getblogTypeOne(id)
}
// 修改一个博客分类 
exports.updataBlogtypeServer = async (obj)=>{
return await updataBlogType(obj)
}
// 删除一个博客分类 
exports.deleteBolgtypeServer = async (id)=>{
// 首先验证该分类下是否存在文章 如果关联的分类下没有文章则能删除 否则不能
return await deleteBlogType(id)
}