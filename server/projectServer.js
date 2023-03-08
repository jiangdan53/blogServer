const {addPorject,getProjectOne,getProjectAll,deleteProject,updataProject} = require('../dao/porjectDb')
exports.addProjectServer = async function (obj){
    // 添加一个项目 
    obj.description = JSON.stringify(obj.description);
return  await addPorject(obj)
}

exports.getProjectAllServer = async function(){
    // 查询所有项目列表
    return await getProjectAll()
}
// 删除
exports.deleteProjectServer = async function(id){
    return await deleteProject(id)
}
// 获取单个
exports.getProjectOneServer = async function(id){
return await getProjectOne(id)
}
// 修改
exports.updataProjectServer = async function(id,obj){
    return await updataProject(id,obj)
}