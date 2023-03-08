const adminModel = require('./model/adminModel')
exports.loginDb = async (userinfo)=>{
return  await adminModel.findOne({
    attributes:['id','loginId','userName'], // 返回给客户端的用户字段过滤 不能带密码 
    where:{
        loginId:userinfo.loginId,
        loginPwd:userinfo.loginPwd
    }
})
}
exports.updataAdminDb = async (userinfo)=>{
    return await adminModel.update({loginPwd:userinfo.loginPwd,userName:userinfo.userName},{
        attributes:['id','loginId','userName'],
        where:{
            id:userinfo.id
        }
    })
}
exports.whoamiDb = async (userId)=>{
  return await  adminModel.findOne({
        attributes:['id','loginId','userName'],
        where:{
            loginId:userId
        }
    });
}
exports.addAdminDb = async function(obj){
    const x = adminModel.findOne({
        where:{
            loginId:obj.loginId
        }
    })
    if(x){
        return '该用户已存在'
    }
return await adminModel.create(obj)
}
