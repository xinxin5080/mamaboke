let express = require('express')
let router = express.Router()
// 引进模块
let controller = require('../controller/uresController')

// 登陆页面
router.get("/login",(req,res)=>{
   res.render('user/login')
})
// 注册页面
router.get("/register",(req,res)=>{
    res.render('user/register')
 })
// 注册提交
router.post("/adduser",controller.handlePostUser)
// 登陆提交
router.post("/login",controller.loginUser)
// 注销请求
router.get("/logout",controller.getlogout)

module.exports = router