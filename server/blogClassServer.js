const {addBlogclass,getBlogClassAll} = require('../dao/blogClassDb')
exports.addBlogClass = async  (obj)=>{
  return  await  addBlogclass(obj)
}
 
exports.getBlogClassAllServer = async ()=>{
  return await getBlogClassAll()
}