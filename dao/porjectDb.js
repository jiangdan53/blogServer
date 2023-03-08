const porjectModel = require('./model/porjectModel')
exports.addPorject = async function(obj){
    const count = await exports.getProjectOne(obj.name)
   if(!count){
    const data =  await porjectModel.create(obj);
    data.description = JSON.parse(data.description)
    return data
   }else{
    return '该文章名称以存在 请查看项目是否重复'
   }
}
exports.getProjectOne = async function(id){
    // 获取单个项目的详情;
    return await porjectModel.findByPk(id)
}
exports.getProjectAll = async function(){
    let projcerArr = await porjectModel.findAndCountAll();
    projcerArr.rows = projcerArr.rows.map(it=>{
        return Object.assign(it,{description:JSON.parse(it.description)})
    })
return projcerArr
}
exports.deleteProject = async function(id){
let p = await exports.getProjectOne(id)
if(p){
    return await porjectModel.destroy({
        where:{
            id
        }
    })
}else{
    return '当前项目以被删除 刷新即可'
}
}
exports.updataProject = async function(id,obj){
let p = await exports.getProjectOne(id);
let newobj  = obj;
delete newobj.id;
newobj.description = JSON.stringify(newobj.description)
obj = newobj
if(p){
    let po = await porjectModel.update(obj,{
        where:{
            id
        }
    })
    console.log(po)
    if(!!(po.toString() * 1)){
        return '修改成功'
    }else{
        return '修改失败'
    }
}else{
    return '你当前修改的项目已经被删除 '
}
}