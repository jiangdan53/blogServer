# 登录 
>请求地址 /api/login
 请求方式POST
 - 携带参数
 - loginId 类型 String
 - loginPwd 类型 String
 - captcha  类型 String 
    - 需要先请求验证码接口 /api/res/captcha 得到一个图形验证码
  > 登录成功后会返回一个token 在消息体内的authorization 中 
# 7天免登录 
>请求地址 /api/login
请求方式 GET
> 携带token 验证通过则登录成功 
# 修改用户信息 
> /api/login/updataAdmin
请求方式 POST
loginId  不能修改 唯一值
userName 可以修改
loginPwd 新密码 
captcha 验证码
oringinloginPwd 旧密码
> 需要携带token
# 上传图片 
> 地址 /api/banner/uploadimg 
 请求方式 POST
   - 需要token验证 请求头中携带authorization参数 值为token码
   - 上传图片时图片的消息体名称为image(form-data)
   - 上传成功会返回给你一个上传成功的路径 
   - 如果修改图片需要携带上一次上传成功时的图片地址 
> 请将返回的图片地址于banner详情并发送给服务器 
# 获取banner图片详情 
> 地址 /api/banner
请求方式 GET
# 上传banner信息 
>地址 /api/banner/uploadInfo
请求方式 POST
> 需要携带token 
- 参数 
- id:不需要该 默认值 请将服务器给默认图片修改即可 后续请携带相同id 
- Img: 上传图片的地址
- Title:你设置的图片标题
- Description:你设置的图片描述
- originalname:图片的原始名称 图片上传成功时会返回给你 
- motto:格言
返回设置成功的对象 
# 获取博客列表 
>地址 /api/article/getblos/:id/:categoryId
- id 为总类id也就是我们nav导航 必传
- categoryId 这是我们每个类对应的id 请求当前总类下的全部时 值为-1 必传
 - 分页参数为 
   - pageIndex 表示当前第几页 
   - limit 表示一页多少条 
- 返回参数模型 
 ```json
 {
    "code": 200, //状态码
    "msg": "ok", // 消息
    "data": { // 数据体
        "count": 29, // 数据条数
        "rows": [ // 数据列表
            {
                "createDate": "发布时间",
                "id": 1, //文章id
                "title": "文章标题",
                "description": "文章描述",
                "articleId": ,
                "articleClassId": 1, //分类id
                "scanNumber": 1, //评论数
                "commentNumber": 162602515, // 浏览量
                "recommendNumber": 1, // 分享次数
                "classTotal": 1,
                "category": { //文章分类信息
                    "name": "html"  
                }
            }
           
        ]
    }
}
 ```

  