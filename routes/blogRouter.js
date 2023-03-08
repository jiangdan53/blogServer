const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addBlogServer,getBlogAllServer,getblogTypeOneServer,updataBlogtypeServer,deleteBolgtypeServer} =require('../server/blogTypeServer');

// 添加一个博客分类 
route.post('/addblogType',asyncHandul(async (req,res,next)=>{
        return await addBlogServer(req.body);
}))
route.get('/',asyncHandul(async ({query})=>{
        return await getBlogAllServer(query)
}))
// 根据id获取指定分类信息 包括父类信息 
route.get('/getBlogTypeOne/:id',asyncHandul(async (req,res,next)=>{
         return await getblogTypeOneServer(req.params.id);
}))
// 修改一个博客分类 
route.put('/updatablogtype',asyncHandul(async ({body})=>{
        return await updataBlogtypeServer(body);
}))
// 删除一个博客分类 
route.delete('/deleteblogtype/:id',asyncHandul(async (req,res,next)=>{
return await deleteBolgtypeServer(req.params.id);
}))
module.exports = route