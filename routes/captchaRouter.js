const express = require('express');
const route = express.Router();
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {cerateCaptcha} = require('../server/captchaServer')
route.get('/',async (res,req,next)=>{
    const captcha = await cerateCaptcha()
    res.session.captchaText = captcha.text;
    req.setHeader("Content-Type",'image/svg+xml')
    req.send(captcha.data)
})
module.exports = route