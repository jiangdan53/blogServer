const blogTypeModel = require("./model/blogTypeModel")
const {getBlogOne} = require('./blogClassDb');
const blogModel = require('./model/blogModel');
const blogclass = require('./model/blogClassModel');
const {NodtFoundErr} = require('../utils/errors')
exports.addBlogType = async (typeObj)=>{
        const count = await getBlogOne(typeObj.blogId)
        if(count){
            return await blogTypeModel.create(typeObj)
        }else{
            return '总类不存在'
        }
}
//获得一个博客分类
exports.getblogTypeOne = async (id)=>{
    return await blogTypeModel.findByPk(id,{
        include:blogclass
    })
}
//获取所有博客分类 并分页
exports.getBlogTypeAll = async (findenBayPage)=>{
    return await blogTypeModel.findAndCountAll({
        include:{
            model:blogclass
        },
        offset:(findenBayPage.pageIndex  -  1) * 10,
        limit:findenBayPage.limit
    })
}
//修改一个分类的信息 
exports.updataBlogType = async ({id,data})=>{
const onesBlogType = await exports.getblogTypeOne(id)
if(onesBlogType){
  const updataCont =  await blogTypeModel.update(data,{
    where:{
        id
    }
   })
   if(!!(updataCont.toString() * 1)){
    return '修改成功'
   }else{
    return '修改失败 '
   }
}else{
    return '当前修改的分类不存在'
}
}
exports.deleteBlogType = async (id)=>{
    //删除一个分类 按照id删除博客表类对应的文章  describe({where:{artliceClassId:1}})
    const blogtype = await exports.getblogTypeOne(id)
    if(blogtype){
      const blogDeleteCount =  await blogModel.destroy({
            where:{
                articleClassId:id
            }
        })
       await blogTypeModel.destroy({
            where:{
                id
            }
        })
    console.log(blogDeleteCount)
        if(blogDeleteCount > 0){
            return {
                affectedSize:blogDeleteCount
            }
        }else{
            return {
                affectedSize:0
            } 
        }
       
       
    }else{
        throw new NodtFoundErr(`当前博客分类${blogtype === null ? "不存在 或已被删除" : ""}`)
    }
}


  