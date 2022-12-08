const {addArticle,getBlogs,getblog,updataArticle,deleteArticle} = require('../dao/blogDb');
//服务器层 调用数据层 接口添加一条博客
exports.addArticleSercer = async (obj)=>{
    return await addArticle(obj)
}
//服务器层 调用数据层 接口获取博客列表
exports.getBlogsServer = async (obj)=>{
return await getBlogs(obj)
}
//服务器层 调用数据层 接口获取单条博客
exports.getblogServer = async (id)=>{
    return await getblog(id)
}
//服务器层 调用数据层 接口修改一条博客的信息
exports.updataArticleServer = async (id,obj)=>{
return await updataArticle(id,obj)
}
//服务器层 调用数据层 接口修改一条博客的信息 
exports.deleteArticleServer = async (id)=>{
return await deleteArticle(id)   
}
