const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addBlogClass,getBlogClassAllServer} = require('../server/blogClassServer');
//获取所有总类
route.get('/',asyncHandul(async (res,req,next)=>{
        return await getBlogClassAllServer()
}))
// 添加一个博客总类
route.post('/addblogClass',asyncHandul(async (res,req,next)=>{
        return addBlogClass(res.body) 
}))



module.exports = route