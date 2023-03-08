const commentModel = require('./model/commentModel');
exports.addcomment = async function (obj){
    // 创建一个用户提交的评论
 return await commentModel.create(obj)
}
exports.getCommentTitleComment = async function (titleId){
    // 客户端按照文章id获取相关文章的品论
    return await commentModel.findAndCountAll({
        where:{
            titleId,
        }
    })
}
exports.getCommentAll = async function(query){
    // 后台系统获取全部评论列表
return await commentModel.findAndCountAll({
    limit:query.limit,
    offset:(query.page - 1) * query.limit
});
}
exports.deletecommentOen = async function (tuchId,id){
    // 如果是后台则直接删除 如果是用户自己删除自己的评论则需要传入自己的
    const comment = await commentModel.findByPk(id);
    if(tuchId === comment.phone){
        return await commentModel.destroy({
            where:{
                id,
            }
        })
    }
}