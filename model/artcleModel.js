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
    // 7.0发布操作,向数据库插进数据
    issue:(newdata,cb)=>{
      let sqlStr = 'insert into userdata set ?'
      connection.query(sqlStr,newdata,(err,results)=>{
        if(err) return cb(err,null)
        cb(null,results)
      })
    },
    particulars:(newdata2)=>{
      
    }
}