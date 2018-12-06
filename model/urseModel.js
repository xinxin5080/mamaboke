// 数据库操作页面
// 连接数据库
let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: '24-boke'
})
connection.connect()



module.exports = {
    // 1.2查询数据(用来判断注册用户是否同名,或者名字密码为空)
    judgeUesr:(username,cb)=>{
    // sql语句查询
    let sqlStr = 'select * from users where username = ?'
    connection.query(sqlStr,[username],(err,results)=>{
        if(err) return cb(err,null)
        cb(null,results)
    })
    },

    // 1.1添加用户(注册))
    addUesr:(newdata,cb)=>{
    // 写sql语句，往数据库中插入数据
    let sqlStr = 'insert into users set ?'
    connection.query(sqlStr,newdata,(err,results)=>{
        if(err) return cb(err,null)
        cb(null,results)
    })
    },

    // 1.3登录查询、
    loginData:(loginName,cb)=>{
    // 写sql语句,查询用户名和密码是否有
    let sqlStr = 'select * from users where username=? and password=?'
    connection.query(sqlStr,[loginName.username,loginName.password],(err,results)=>{
        if(err) return cb(err,null)
        cb(null,results)
    })
    }
}
