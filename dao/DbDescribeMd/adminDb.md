# 数据成接口 
 - loginDb 用户登录时的数据查询接口 
   - 接收一个对象为参数 包含 loginId loginPwd 两个字段 (验证码是在服务层逻辑完成的)
    - 查询数据库 返回对象为当前数据库被的数据 token在路由层完成传递
 - updataAdminDb 此接口为修改用户参数 
   - 接收一个对象 只修改当前用户的用户名和密码 
 - whoamiDb 用户免登录接口 
   - 接收userId 在token中解析出来 