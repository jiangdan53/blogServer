const blogModel = require('./model/blogModel');
const blogTypeModel = require('./model/blogTypeModel');
const {getBlogOne} = require('./blogClassDb');
const {getblogTypeOne} = require('./blogTypeDb');
const {NodtFoundErr, UploadErr} = require('../utils/errors');
const blogClassModel = require('./model/blogClassModel');
const {getTocArr} = require('../utils/setToc')
//先一个类添加一个列表文章详情 
exports.addArticle = async (articleObj)=>{
    //查询 查询class总类 
        const ClassCount = await getBlogOne(articleObj.classTotal)
    //查询 查询type类 
        const TypeCount = await getblogTypeOne(articleObj.articleClassId);
        if(ClassCount && TypeCount){
            articleObj.scanNumber = 0,
            articleObj.commentNumber = 0,
            articleObj.recommendNumber = 0
            // 将对象转化为我们需要的对象形式 并且将toc数组从markdownContent中取出来并且设置成为正确的格式
            articleObj = getTocArr(articleObj);
            TypeCount.articleCount++
            await TypeCount.save()
          return await  blogModel.create(articleObj)
        }else{
            throw new  UploadErr(`你传递的${ClassCount === null ? "总类ID不正确" : ''}${TypeCount === null ? "分类ID不正确" :""} 无法添加`)
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
                classTotal:1,    //根据总类id查数据   
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
 // 查询所有博客信息
 exports.getBlogAll = async (AllArticleObj)=>{
    return await blogModel.findAndCountAll({
        include:{
            model:blogTypeModel,
            as:'category',
            include:blogClassModel
        },
        limit:AllArticleObj.limit,
        offset:(AllArticleObj.pageIndex - 1 ) * AllArticleObj.limit //跳过条数 这个根据 客户端传递的数量决定 
    })
 }
 // 查询一条博客信息 
 exports.getblog = async (id,query)=>{
    const blog = await blogModel.findByPk(id,{
        include:{
            attributes:['name','id'],
            model:blogTypeModel,
            as:'category'
        },
    })
    if(query && query.name === 'client'){
        blog.scanNumber++
        await blog.save()
    }
    return blog
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
        // 得到文章所属的分类 
        const Type = await blogTypeModel.findByPk(count.articleClassId)
        Type.articleCount-- 
        if(Type.articleCount >= 0){
            // 更新分类中的文章数量
            await Type.save()
        }
        return blogModel.destroy({
            where:{
                id
            }
        })
    }else{
        throw new NodtFoundErr()
    }
    
}