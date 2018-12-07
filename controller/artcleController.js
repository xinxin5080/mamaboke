let model = require('../model/artcleModel')
// 7.1引进时间处理moment

// 引入处理时间moment库
let moment = require('moment');
// 将时间设置成中文
moment.locale('zh-cn');
// 
let mditor = require("mditor");

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
        // 8.1post请求.从req.query中获取url中的id
        // 8.2将id传递过去,进行数据可查询
        let articleId = req.query.id
        
        model.particulars(articleId,(err,data)=>{
            if(err) return res.json({status:0,msg:"数据库操作错误"})
            // 8.3data里储存查到的数据
            // 8.4将时间转格式
            data[0].ctime = moment(data[0].ctime).format('MM-DD-YYYY');
            // 8.5将文章的内容从markdown格式转换成html字符串，利用mditor.Parser()
            let parser = new mditor.Parser();
          
            data[0].conten = parser.parse(data[0].conten);
            
            res.render('user/detail', {
                        article: data[0],
                        isLogin: req.session.isLogin,
                        user: req.session.user
                     })
            // res.render("user/detail")
        })
    },
    // 9.0文章编辑页面
    handleGetEdit:(req,res)=>{
        edit:(()=>{
            
        })
    }
}