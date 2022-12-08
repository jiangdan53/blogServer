# 接口
  1.  请求路径为/api/login 请求方法为 POST 参数有loginId loginPwd captcha 
   - loginId 为当前登录用户的id
   - loginPwd 为当前用户的密码 
   - captcha 为验证码
  - 逻辑 
    - 当用户输入的验证码不正确时 返回验证码不正确 
    - 当用户获取验证码 超过60秒为输入时 返回验证码过期 
    - 当用户为携带验证码时 返回用户为输入验证码 
  - 当验证码通过且用户名密码正确时 我们将当前登录成功的用户名作为token生成的一部分 传递给token生成函数 pudToken(参数一，参数二，参数三) 参数一位req返回给客户端的对象 我们此函数中设置相应头数  authorization 做为我们参数的标志 参数二位我们设置token的过期时间 参数三位我们传递给token的用户信息 
  2. /api/login/whoami 请求方法位 GET 
   - 此方法需要再中间件中设置需要验证的请求路径 当验证通过才能到我们路由请求中 
   - 需要再请求头中添加 token
  3. /api/login/updataAdmin 请求方法位PUT 
   - 次方法需要传递 新密码为loginPwd 旧密码位oblloginPwd并且还得时正确的 
   - 同时也需要携带token值 