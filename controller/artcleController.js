let model = require('../model/artcleModel')
// 7.1引进时间处理moment
// let moment = require("moment")

module.exports= {
    // 7.0发布页面
    handlePostText:(req,res)=>{
        // 获取传递过来的数据
        let newdata = req.body//{ title: '1111', conten: '1111', userId: '26' }
        newdata.ctime = new Date()//将时间追加进去
        // console.log(newdata)
        // 引进model函数
        model.issue(newdata,(err,data)=>{
            if(err) return res.json({status:0,msg:"数据库操作错误"})
            // 7.2返回文章的id作为get请求的参数
            // console.log(data)
            if(data)  res.json({status:200,articleId:data.insertId})
        })
    },
    // 8.0文章详情页
    showDetailPage:(req,res)=>{
        
        // model.particulars(newdata2,(err,data)=>{
        // //  获取id,用于
            
        // })
        res.render("user/detail")
    }
}