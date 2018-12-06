let express = require('express')
let router = express.Router()

router.get("/",(req,res)=>{
   res.render('index',{
        isLogin:req.session.isLogin,//3.3从session中获取用户是否登陆
        user:req.session.user//3.4从session中获取用户信息
   })
})

module.exports = router