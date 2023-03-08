const messageModel = require('./model/messageModle');
exports.addMessage = async function(obj){
    return await messageModel.create(obj)
}
exports.getMessageAll = async function(query){
    return messageModel.findAndCountAll({
        limit:query.limit, // 每页条数 
        offset:(query.offset - 1) * query.limit //根据当前页码跳过多少条
    })
}
exports.deleteMessage = async function(id){
    return await messageModel.destroy({
        where:{
            id
        }
    })
}