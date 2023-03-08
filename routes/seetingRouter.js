const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addSeetingServer,getSeetingServer,updataSeetingServer,deleteSeetingServer} = require('../server/seetingServer')
route.get('/',asyncHandul(async ()=>{
return await getSeetingServer()
}))
route.post('/addseeting',asyncHandul(async ({body})=>{
return await addSeetingServer(body)
}))
route.put('/updataseeting/:id',asyncHandul(async ({params,body})=>{
return await updataSeetingServer(params.id,body)
}))
route.delete('/deleteseeting/:id',asyncHandul(async ({params})=>{
return await deleteSeetingServer(params.id)
}))
module.exports = route