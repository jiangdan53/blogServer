const {addArticle,getBlogs,getblog,updataArticle,deleteArticle,getBlogAll} = require('../dao/blogDb');
//服务器层 调用数据层 接口添加一条博客
exports.addArticleSercer = async (obj)=>{
    return await addArticle(obj)
}
// 服务器层 调取数据层接口 获取所有博客列表 
exports.getBlogAllServer = async(obj)=>{
    return await getBlogAll(obj)
}
//服务器层 调用数据层 接口根据总类id和分类id获取博客列表
exports.getBlogsServer = async (obj)=>{
return await getBlogs(obj,queryName)
}
//服务器层 调用数据层 接口获取单条博客
exports.getblogServer = async (id,queryName)=>{
    return await getblog(id,queryName)
}
//服务器层 调用数据层 接口修改一条博客的信息
exports.updataArticleServer = async (id,obj)=>{
return await updataArticle(id,obj)
}
//服务器层 调用数据层 接口修改一条博客的信息 
exports.deleteArticleServer = async (id)=>{
return await deleteArticle(id)   
}
