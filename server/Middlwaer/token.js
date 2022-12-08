const jwt = require('jsonwebtoken')
const md = require('md5');
const {ValidationErr} = require('../../utils/errors')
/**
 * 添加一个jwt加密的token令牌 校验登录
 * @param {*} res   // 给客户端加上token值得相应对象
 * @param {*} maxAge  // 设置免登录得有效时间 默认为1(3600 * 24)天
 * @param {*} info   
 */

exports.pudToken = function(res,maxAge = 1,info = {}){
    // 通过插件 设置一个值 第一个参数为我们的用户名 第二个参数为我们的服务器端的密码 第三个参数为我们的过期时间 这就是我们jwt加密的三部分
 const token = jwt.sign(info,md(process.env.WHOAMI_SEECR),{
    expiresIn: 3600 * 24 * maxAge //以秒未单位
 })
 res.setHeader('authorization',`Bearer ${token}`) // 生成的token是加密过后的需要客户端自行储存
}
/**
 * 
 * @param {*} req  我们传递给客户端的相应头
 */
exports.verify = function(req){
let token ;
token =  req.headers.authorization; // 查看客户端在请求时是否带有atuhorization这个属性是否有值 
if(!token){
    return false // 如果不带token直接拒绝免登录
}
token = token.split(' ');
token = token.length === 1 ? token[0] : token[1] //查看 客户端传递过来的token值是否带有前缀

try{
 const result = jwt.verify(token,md(process.env.WHOAMI_SEECR))   
    return result
}catch(err){
    throw new ValidationErr('登录失败 密钥可能被修改')// token 校验失败也直接拒绝
}
}