const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addProjectServer,getProjectAllServer,deleteProjectServer,getProjectOneServer,updataProjectServer} = require('../server/projectServer');
route.post('/addproject',asyncHandul(async req =>{
    return await addProjectServer(req.body)
}))
route.get('/',asyncHandul(async ()=>{
    return await getProjectAllServer()
}))
route.delete('/deleteproject/:id',asyncHandul(async ({params})=>{
    return deleteProjectServer(params.id)
}))
route.get('/getprojectOne/:id',asyncHandul(async ({params})=>{
    return await getProjectOneServer(params.id)
}))
route.put('/updataproject/:id',asyncHandul(async ({params,body})=>{
return await updataProjectServer(params.id,body)
}))
module.exports = route