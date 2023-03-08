const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {pudToken} = require('../server/Middlwaer/token')
const {addCommentUserServer,updataCommentUserServer,commentUserLoginServer,commentUserWhoamiServer} = require('../server/commentUserServer');
route.post('/',asyncHandul(async({body},req)=>{
    const x = await commentUserLoginServer(body)
    let val = x.phone;
    pudToken(req,body.remember,{id:val.toString()});
return x
}))
route.get('/whoami',asyncHandul(async ({userId})=>{
    console.log(userId)
return await commentUserWhoamiServer(userId)
}))
route.put('/updataUser/:id',asyncHandul(async({body,params})=>{
    return await updataCommentUserServer(body,params.id)
}))
route.post('/addUser',asyncHandul(async({body})=>{
    return await addCommentUserServer(body)
}))
module.exports = route;