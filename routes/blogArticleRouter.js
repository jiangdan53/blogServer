const express = require('express');
const route = express.Router();
const { addArticleSercer,
    getBlogsServer,
    getblogServer,
    deleteArticleServer,
    updataArticleServer,
    getBlogAllServer } = require('../server/blogServer');
const { asyncHandul } = require('./Middlwaer/setSendResult')
const { getTocArr } = require('../utils/setToc')
// 添加一篇文章
route.post('/addArticle', asyncHandul(async (res, req, next) => {
    return addArticleSercer(res.body)
}))
// 按总类查询数据 
route.get('/getblos/:id/:categoryId', asyncHandul(async ({ params, query }) => {
    query = Object.assign({}, { pageIndex: 1, limit: 10 }, query)
    const obj = Object.assign({}, params, query)
    return getBlogsServer(obj)
}))
//分页获取全部文章 
route.get('/getblogall', asyncHandul(async ({ query }) => {
    query.limit = (query.limit || 10) * 1
    query.pageIndex = (query.pageIndex || 1) * 1
    return await getBlogAllServer(query)
}))
// 依据id修改文章信息
route.put('/updataarticle/:id', asyncHandul(async ({ params, body }) => {
    // 处理toc数组
    body = getTocArr(body)
    return await updataArticleServer(+params.id, body)
}))
// 删除一条博客
route.delete('/deletearticle/:id', asyncHandul(async ({ params }) => {
    return await deleteArticleServer(+params.id)
}))
// 获取一条博客信息
route.get('/getblog/:id', asyncHandul(async ({ params,query }) => {
    return await getblogServer(+params.id,query)
}))
module.exports = route