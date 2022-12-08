const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addBlogClass,getBlogClassAllServer} = require('../server/blogClassServer')
// 添加一个博客总类
route.post('/addblogClass',asyncHandul(async (res,req,next)=>{
        return addBlogClass(res.body) 
}))
// 查询所有总类 返回给客户端用作nav导航栏 
route.get('/getBlogClass',asyncHandul(async (res,req,next)=>{
        return await getBlogClassAllServer()
}))
module.exports = route