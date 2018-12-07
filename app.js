let express = require('express')
let app = express()
// 3.0引入session
let session = require('express-session')
// 引入路由
let indexRouter = require("./router/indexRouter")
let userRouter = require("./router/userRouter")
let articleRouter =require("./router/articleRouter")

// 引入body-parser并使用
let bodyParser = require('body-parser');
// 3.0 使用express-session中间件
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: true
  }))

// 设置模板和挂载静态资源
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/node_modules', express.static('./node_modules'))

// 使用bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 使用路由
app.use(indexRouter)
app.use(userRouter)
app.use(articleRouter)


app.listen('3300',()=>{
    console.log("http://127.0.0.1:3300")
})
