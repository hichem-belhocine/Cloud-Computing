const mysql = require('mysql');
var con;
con = {
    mysql_pool: mysql.createPool({
       host: "35.241.129.120",
        port: "3306",
        user: "root",
        database: "project1",
        password: "secret"
    })
};
module.exports = con;
