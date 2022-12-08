const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addBlogServer,getBlogAllServer} =require('../server/blogTypeServer');
// 添加一个博客分类 
route.post('/addblogType',asyncHandul(async (res,req,next)=>{
        return await addBlogServer(res.body);
}))

// 获取一个博客分类 的所有文章
route.get('/getblogtypeall/:name',asyncHandul(async (res,req,next)=>{
         return await getBlogAllServer(res.params.name);
}))
// 修改一个博客分类 
route.put('/updatablogtype/:id',asyncHandul(async (res,req,next)=>{
        return await updataBlogtype(res.params.id);
}))
// 删除一个博客分类 
route.delete('/deleteblogtype/:id',asyncHandul(async (res,req,next)=>{
return await deleteBolgtype(res.params.id);
}))
module.exports = route