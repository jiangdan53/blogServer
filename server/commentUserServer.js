const {addCommentUser,updataCommentUser,commentUserLogin,commentUserWhoami} = require('../dao/commentUserDb');
const md = require('md5');
const Validate = require('validate.js');
exports.addCommentUserServer = async function(obj){
const relus = {
    userName:{
        presence:{
            allowEmpty:false
        },
        type:'string',
        length:{
            miximun:2,
            maximun:8
        }
    },
    phone:{
        presence:{
            allowEmpty:false
        },
        type:'string',
        format:/^1([3-9])\d{9}/
    },
    userPwd:{
        presence:{
            allowEmpty:false
        },
        type:'string',
       format:/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,16}/
    },
    acatar:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    },
    city:{
        presence:{
            allowEmpty:false
        },
        type:'string'
    }
}
await Validate.async(obj,relus);
obj.userPwd = md(obj.userPwd);
return await addCommentUser(obj)
}
exports.commentUserLoginServer = async function(obj){
obj.userPwd = md(obj.userPwd);
const x = await commentUserLogin(obj);
if(x && x.dataValues){
    return x.dataValues
}else{
    return '用户名或密码错误'
}
}
exports.updataCommentUserServer = async function(obj,id){
    const reuls = {
        userName:{
            presence:{
                allowEmpty:false
            },
            type:'string',
            length:{
                miximun:2,
                maximun:8
            }
        },
        phone:{
            presence:{
                allowEmpty:false
            },
            type:'string',
            format:/^1([3-9])\d{9}/
        },
        userPwd:{
            presence:{
                allowEmpty:false
            },
            type:'string',
           format:/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,16}/
        },
        newUserPwd:{
            presence:{
                allowEmpty:false
            },
            type:'string',
            format:/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,16}/
        },
        acatar:{
            presence:{
                allowEmpty:false
            },
            type:'string'
        },
    }
    await Validate.async(obj,reuls);
    obj.olduserPwd = md( obj.olduserPwd);
    obj.userPwd = md(obj.userPwd);
    const x = await commentUserLogin({phone:obj.phone,userName:obj.userName,userPwd:obj.olduserPwd})
 if(x && x.dataValues){ 
    const resule = await updataCommentUser(obj,id);
    if(resule.toString() === '1'){
        return x.dataValues
    }else{
        throw new ValidationErr('新密码于旧密码相同')
    }
 }else{
    throw new ValidationErr('旧密码错误，请从新输入')
 }
}
exports.commentUserWhoamiServer = async function(phone){
    const userObj = await commentUserWhoami(phone)
    if(userObj && userObj.dataValues){
        return userObj.dataValues
    }else{
        throw new ValidationErr('未登录，或登录以过期')
    }
}