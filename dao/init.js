//该文件对数据库进行初始化操作
const sequelize = require('./dbConnect') //数据库实例
const adminModel =  require('./model/adminModel') //管理员数据模型
 require('./model/bannerModel') ; //创建banner实例
 require('./model/blogTypeModel'); //创建blog单一类实例
 require('./model/blogClassModel'); // 导航到某个blog总类实例
 require('./model/blogModel') // 文章表实例
require('./relation')
const md = require('md5');
 function getAdminisUnll (){ 
    adminModel.create({
    loginId:'admin',
    userName:'丹丹',
    loginPwd:md('123123')   
})
}
// (async function(){
//   const blogclasscount = await blogclass.count() ; 
//   const blogtypecount = await blogtype.count() ;
// 
// })()

adminModel.count().then(res=>{
    if(!res){
        getAdminisUnll()
    }
}); //模型·count()查看数据库中的数据量 sequelize导出的所有方法均为promise是异步的

module.exports = sequelize.sync({sync:true,alter:true}).then(()=>{console.log('所有模型同步完毕')})