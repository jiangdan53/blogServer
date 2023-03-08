const {ValidationErr} = require('../utils/errors');
const {loginDb,updataAdminDb,whoamiDb,addAdminDb} = require('../dao/adminDb')
const md = require('md5');
exports.loginServer = async function(obj){
    obj.loginPwd = md(obj.loginPwd) // 用户传递过来的数据我们进行解密也称为再次加密 于数据库内的密码进行对比 
      const  userObj = await loginDb(obj)

    if(userObj && userObj.dataValues){
        return  userObj.dataValues
    }else{
        throw new ValidationErr('用户名或密码错误')
    }
}
exports.addAdminServer = async function(obj){
obj.loginPwd = md(obj.loginPwd);
return await addAdminDb(obj);
}
exports.whomiServer = async function(userId){
    const userObj = await whoamiDb(userId)
    if(userObj && userObj.dataValues){
        return userObj.dataValues
    }else{
        throw new ValidationErr('未登录，或登录以过期')
    }
}
exports.updataAdminServer = async (newUserObnj)=>{
    newUserObnj.oldLoginPwd = md(newUserObnj.oldLoginPwd);
    newUserObnj.loginPwd = md(newUserObnj.loginPwd)
    // 查询用户是否存在 判断旧密码是否正确
const userObj = await loginDb({loginId:newUserObnj.loginId,loginPwd:newUserObnj.oldLoginPwd})
if(userObj && userObj.dataValues){
    const result =  await updataAdminDb({id:userObj.id,loginId:newUserObnj.loginId,loginPwd:newUserObnj.loginPwd,userName:newUserObnj.userName})
        if(result.toString() === '1'){
            return {
                id:userObj.id,
                userName:newUserObnj.userName,
                loginId:newUserObnj.loginId
            }
        }else{
            throw new ValidationErr('修改失败 密码用户名不能相同')
        }
 
   
}else{
    throw new ValidationErr('旧密码错误，请从新输入')
}
}
