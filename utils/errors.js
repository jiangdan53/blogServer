// 自定义错误处理中间件
// 当错误发生时我们捕获到了我们就可以抛出我们自定义的错误信息
// 业务处理错误基类 
const {setData} = require('../routes/Middlwaer/setSendResult')
class ServiceErr extends Error {
    /**
     * 
     * @param {String} msg  错误信息
     * @param {number} code 消息码
     */
constructor(msg,code){
super(msg),
this.code = code
}
// 方法 
 toResponseJSON(){
    return setData(null,this.message,this.code)
 }
}

// 文件上传错误
/**
 * 错误处理子类
 */

exports.UploadErr = class extends ServiceErr {
constructor(msg){
super(msg,412)
}
}

// 禁止访问
exports.FobiddenErr = class extends ServiceErr {
    constructor(msg){
    super(msg,401)
    }
    }
// 验证错误
exports.ValidationErr = class extends ServiceErr {
    constructor(msg,code = 406){
    super(msg,code)
    }
    }
// 无资源
exports.NodtFoundErr = class extends ServiceErr {
    constructor(){
    super('访问的资源不存在',408)
    }
    }
// 未知错误
exports.UnkownErr = class extends ServiceErr {
    constructor(){
    super('学习中...等待',500)
    }
    }
    module.exports.ServiceErr = ServiceErr
