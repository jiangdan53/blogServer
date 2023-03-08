const commentUserModel = require('./model/commenrUserModel');
exports.addCommentUser = async function(obj){
const x = await commentUserModel.findByPk(obj.phone)
if(x){
    return '该手机号已经被注册'
}else{
    const o = await commentUserModel.create(obj)
    return {userName:o.userName,phone:o.phone,acatar:o.acatar}
}
} 
exports.commentUserLogin = async function(obj){
    const x = await commentUserModel.findOne({
        attributes:['id','userName','phone'],
        where:{
            phone:obj.phone,
            userPwd:obj.userPwd,
            userName:obj.userName
        }
    })
    if(x){
        return x
    }else{
        return '用户名或者密码错误' 
    }
}
exports.commentUserWhoami = async function(phone){
    const x = await commentUserModel.findOne({
        attributes:['id','userName','phone'],
        where:{
            phone
        }
    })
    if(x){
        return x
    }else{
        return 'token过期'
    }
}
exports.updataCommentUser = async function(obj,id){
return await commentUserModel.update(obj,{
    attributes:['id','userName','phone'],
    where:{
      id
    }
})
}
