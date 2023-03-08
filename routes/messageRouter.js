const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {addMessageServer,deleteMessageServer,getMessageAllServer} = require('../server/messageServer');
route.get('/',asyncHandul(async ({query})=>{
return await getMessageAllServer(query)
}))
route.post('/addmessage',asyncHandul(async ({body})=>{
    return await addMessageServer(body)
}))
route.delete('/deletemessage/:id',asyncHandul(async ({params})=>{
    return await deleteMessageServer(params.id)
}))
module.exports  = route 