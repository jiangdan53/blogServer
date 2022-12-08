const svgCaptcha = require('svg-captcha') ;
exports.cerateCaptcha = async  ()=>{
    // 创建一个 验证码 
     return svgCaptcha.create({
        size:'4', // 验证码长度
        ignoreChars:'iIl01Oo',// 排除相识单词以及字符
        noise:6,
        color:true
     })
}