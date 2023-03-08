const {addSeeting,deleteSeeting,getSeeting,updataSeeting} =require('../dao/seeingDb');
const Valdatal = require('validate.js')
exports.addSeetingServer = async function(obj){
const ruls = {
    blogTitle:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    },
    email:{
        presence:{
            allowEmpty:false
        },
        format:/\w+@\w+(.\w+)+/
    },
    havetabel:{
    presence:{
        allowEmpty:false
    },
    type:'string'
    },
    webImg:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    },
    githubName:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    },
    githubAddress:{
        presence:{
            allowEmpty:false
        },
        type:'string',
        format:/^((http:)|(https:))\/\/github.com\/\w+/
    },
    qqCode:{
        presence:{
         allowEmpty:false   
        },
        type:'string'
    },
    qrCode:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    },
    wxCode:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    },
    wximg:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    }
}
await Valdatal.async(obj,ruls);
    return await addSeeting(obj)
}
exports.getSeetingServer = async function(){
    return await getSeeting()
}
exports.updataSeetingServer = async function(id,obj){
    return await updataSeeting(id,obj)
}
exports.deleteSeetingServer = async function(id){
    return await deleteSeeting(id)
}