const mysql = require('mysql');
var con;
con = {
    mysql_pool: mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DB,
        password: process.env.MYSQL_PASS
    })
};
module.exports = con;
