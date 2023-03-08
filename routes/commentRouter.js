const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addcommentServer,deletecommentOenServer,getCommentAllServer,getCommentTitleCommentServer} = require('../server/commentServer')
route.get('/',asyncHandul(async ({query})=>{
    return await getCommentTitleCommentServer(query.titleId)
}))
route.get('/getcommentall',asyncHandul(({query})=>{
    return getCommentAllServer(query);
}))
route.post('/addComment',asyncHandul(async ({body})=>{
return await addcommentServer(body)
}))
route.delete('/deletecomment/:phone',asyncHandul(async ({params})=>{
return await deletecommentOenServer(params.phone)
}))
module.exports = route