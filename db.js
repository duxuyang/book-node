//创建连接池，保存单独文件中
const mysql = require("mysql");
let pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"123456",
    database:"test",
    port:3306,
    connectionLimit:25
});
//3:导出连接池
module.exports = pool;