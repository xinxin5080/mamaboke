// 引入model数据库处理函数
let model = require("../model/urseModel")
// 2.0引进加盐
let ASD = require("../confij/index")
// 2.0引进md5
let MD5 = require("blueimp-md5")

module.exports = {
    // 注册
    handlePostUser: (req, res) => {
        // 通过bodyParser获取传递过来的参数
        let newdata = req.body
        // 1.2查询用户(判断输入的用户是否合法)
        model.judgeUesr(newdata.username, (err, data) => {
            // 如果错误，就向前台返回错误信息
            if (err) return res.json({
                status: 100,
                msg: '操作数据库错误'
            })
            //如果有查到数据,说明同名
            if (data.length !== 0) return res.json({
                status: 101,
                msg: "用户同名,请更换"
            })


            // 2.1加密-在注册前获取密码加密+加盐在传递,
            newdata.password = MD5(newdata.password, ASD.SAL)
            // 判断成功后再注册
            // 1.1注册新用户
            model.addUesr(newdata, (err, data) => {
                // 如果错误，就向前台返回错误信息
                if (err) return res.json({
                    status: 100,
                    msg: '操作数据库错误'
                })
                // 正确(影响行不！=0)
                if (data.affectedRows !== 0) {
                    res.json({
                        status: 200,
                        msg: '注册成功！进入登录页面'
                    })
                }
            })
        })

    },
    // 登陆
    loginUser: (req, res) => {
        let loginName = req.body
        // 2.2登录之前把用户密码加密加盐在登录(和注册的时候匹配)
        loginName.password = MD5(loginName.password, ASD.SAL)
        //1.3登录请求
        model.loginData(loginName, (err, data) => {
            // 如果错误，就向前台返回错误信息
            if (err) return res.json({
                status: 100,
                msg: '操作数据库错误'
            })
            // 查到没有对象的用户名
            if (data.length === 0) return res.json({
                status: 102,
                msg: '用户名或者密码不正确'
            })
             // 3.1将登陆状态，保存在req.session(目的是用isLogin来判断是否登陆,渲染页面))
             req.session.isLogin = true
             // 3.2将登录人的信息对象,保存在req.session(目的是将用户名字渲染给登陆时候显示)
             req.session.user = data[0]
             console.log(req.session.isLogin)

            // 正确
            res.json({
                status: 201,
                msg: '登录成功'
            })
           
        })
    },
    // 注销
    getlogout:(req, res) => {
    //  4.0清除session
    req.session.destroy(function(err){
        if (err) throw err
        // 返回首页
        res.redirect('/')
    })
    }
}