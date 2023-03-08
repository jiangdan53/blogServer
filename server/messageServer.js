const {addMessage,deleteMessage,getMessageAll} = require('../dao/messageDb');
const Validate = require('validate.js')
exports.addMessageServer = async function(obj){
    Validate.validators.contentEixts = async function(val){
        if(val.trim() !== ''){
            return 
        }else{
            return '未输入可见内容'
        }
    }
    const reuls = {
        nikname:{
            presence:{
                allowEmpty:false
            },
            type:'string',
            length:{
                miximun:2,
                maximun:8
            }
        },
        acatar:{
            presence:{
                allowEmpty:false
            },
            type:'string'
        },
        content:{
            presence:{
                allowEmpty:false
            },
            type:"string",
            length:{
                miximun:1,
                maximun:255
            },
            contentEixts:true
        },
        createDate:{
            presence:{
                allowEmpty:false
            },
            type:'string'
        }
    }
    await Validate.async(obj,reuls);
    return await addMessage(obj);
}
exports.deleteMessageServer = async function(id){
    return await deleteMessage(id)
}
exports.getMessageAllServer = async function(query){
    return await getMessageAll(query)
}