let express = require('express')
let router = express.Router()

// 引入模板
let controller = require('../controller/artcleController')

// 6.0发布页面
router.get("/article/add",(req,res)=>{
    // 6.1进行判断有没登录,没有就跳回首页
    // if(!req.session.isLogin) return res.redirect('/login')
    // 6.2跳转到发布页面,将保持的数据库数据传递过去和登录状态
    res.render('user/article',{
        isLogun:req.session.isLogin,//session中获取登录状态
        user:req.session.user//session中获取用户信息
    })
})

// 7.0发表文章提交请求
router.post("/article/add",controller.handlePostText)

// 8.0文章详情页
router.get("/article/detail",controller.showDetailPage)

module.exports = router