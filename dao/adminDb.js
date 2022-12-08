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
        attributes:['id','loginId','userName','loginPwd'],
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