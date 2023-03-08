const seetingModel = require('./model/seetinModel');
exports.addSeeting = async function(obj){
    console.log(await seetingModel.count())
    if( await seetingModel.count() !== 1 && await seetingModel.count() < 1){
        return await seetingModel.create(obj)
    }else{
        return '请先删除原来的设置'
    }
}
exports.getSeeting = async function(){
    return await seetingModel.findAll();
}
exports.updataSeeting = async function(id,obj){
return await seetingModel.update(obj,{
    where:{
        id
    }
})
}
exports.deleteSeeting = async function(id){
    return await seetingModel.destroy({
        where:{
            id
        }
    })
}