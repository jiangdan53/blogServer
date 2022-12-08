const {NodtFoundErr,UploadErr} = require('../utils/errors');
const {setBannerContent,getBannerAll} = require('../dao/bannerDb');
exports.getBanner = async ()=>{
       const data = await getBannerAll()
       if(!data){
        throw new NodtFoundErr() 
       }else{
        return data
       }
}
exports.setBannerContent = async (obj)=>{
    return await setBannerContent(obj)
}

