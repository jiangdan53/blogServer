const blogModel = require('./model/blogModel');
const blogTypeModel = require('./model/blogTypeModel');
const {getBlogOne} = require('./blogClassDb');
const {getblogTypeOne} = require('./blogTypeDb');
const {NodtFoundErr, UploadErr} = require('../utils/errors')
//先一个类添加一个列表文章详情 
exports.addArticle = async (articleObj)=>{
    //查询 查询class总类 
        const ClassCount = await getBlogOne(articleObj.classTotal)
    //查询 查询type类 
        const TypeCount = await getblogTypeOne(articleObj.articleClass);
        if(ClassCount && TypeCount){
          return await  blogModel.create(articleObj)
        }else{
            return '请检查 子类父类是否存在'
        }
}
// 传递一个博客类名得到该类名下的文章 
exports.getBlogs = async (articleObj)=>{
    if(+articleObj.id && +articleObj.categoryId !== -1){
        return await  blogModel.findAndCountAll({
            where:{
                articleClassId:+articleObj.categoryId
            },
            include:{
                attributes:['name'],
                model:blogTypeModel,
                as:'category',
                where:{
                   id:+articleObj.categoryId
                }
            },
            offset:(articleObj.pageIndex - 1) * 10, //从第几条开始取
            limit:articleObj.limit
           })
    }else{
        return await blogModel.findAndCountAll({
            where:{
                classTotal:+articleObj.id,      
            },
            include:{
                attributes:['name'],
                model:blogTypeModel,
                as:'category'
            },
            offset:(articleObj.pageIndex - 1) * 10, //从第几条开始取
            limit:articleObj.limit 
        })
    }
 } 
 // 查询一条博客信息 
 exports.getblog = async (id)=>{
    return blogModel.findByPk(id,{
        include:{
            attributes:['name'],
            model:blogTypeModel,
            as:'category'
        },
       
    })
 }
// 修改一条博客信息  需要传入id
exports.updataArticle = async (id,obj)=>{
 const count = await exports.getblog(id);
 if(count){
    const updataCount =   await blogModel.update(obj,{
        where:{
            id
        }
    })
        if(!!(updataCount.toString()*1)){
            return await blogModel.findByPk(id,{
                include:{
                    model:blogTypeModel,
                    as:'category'
                }
            })
        }else{
            throw new UploadErr('参数名错误')  
        }

   
 }else{
    throw new NodtFoundErr()
 }
}
//删除一条博客信息 需要传入id
exports.deleteArticle = async (id)=>{
    const count = await exports.getblog(id);
    if(count){
        return blogModel.destroy({
            where:{
                id
            }
        })
    }else{
        throw new NodtFoundErr()
    }
    
}