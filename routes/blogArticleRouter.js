const express = require('express');
const route = express.Router();
const {addArticleSercer,getBlogsServer,getblogServer,deleteArticleServer,updataArticleServer} = require('../server/blogServer');
const {asyncHandul} = require('./Middlwaer/setSendResult')
route.post('/addArticle',asyncHandul(async (res,req,next)=>{
    return addArticleSercer(res.body)
}))
route.get('/getblos/:id/:categoryId',asyncHandul(async ({params,query})=>{
    query = Object.assign({},{pageIndex:1,limit:10},query)
    const obj = Object.assign({},params,query)
    return getBlogsServer(obj)
}))
route.put('/updataarticle/:id',asyncHandul(async ({params,body})=>{
return await updataArticleServer(+params.id,body)
}))
route.delete('/deletearticle/:id',asyncHandul(async ({params})=>{
return await deleteArticleServer(+params.id)
}))
route.get('/getblog/:id',asyncHandul(async ({params})=>{
return await getblogServer(+params.id)
}))
module.exports = route