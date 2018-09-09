const mysql = require('mysql');

const {
    database,
    db_host,
    db_user,
    db_password,
    db_port
} = require('./config');

// 数据库连接池
const pool = mysql.createPool({
    host: db_host,
    user: db_user,
    password: db_password,
    port: db_port,
    database
})

let query = function (hospital) {
    const sql = "SELECT * FROM `db_survey`.`tb_demo_user` where `hospital` LIKE '" + hospital +"'";
    return new Promise((resolve) => {
        pool.getConnection((err, connection) => {
        if(err) {
            throw { error: err}
        }
        connection.query(sql,  (error, results, fields) => {
            return resolve({ data: results })
            // 结束会话
            connection.release();
            // 如果有错误就抛出
            if (error) throw { error: error};
            })
        })
    })
}

let add = function (username) {
    const sql = 'insert `db_survey`.`tb_demo_user`(`username`,`sex`,`identification`) values("' + username + '",1,"12312312312312320");'
    return new Promise((resolve) => {
        pool.getConnection((err, connection) => {
        if (err) {
            throw { error: err}
        }
        connection.query(sql,  (error, results, fields) => {
            // 如果有错误就抛出
            if (error) throw { error: error};
            resolve({ results })
            // 结束会话
            connection.release();
            })
        })
    })
}
let update = function(value) {
    const sql = 'update `db_survey`.`tb_demo_user` set `username`="' + value.username + '" where `userid`="' + value.userid+ '";'

    return new Promise((resolve) => {
        pool.getConnection((err, connection) => {
        if (err) {
            throw { error: err}
        }
        connection.query(sql,  (error, results, fields) => {
            // 如果有错误就抛出
            if (error) throw { error: error};
            resolve({ results })
            // 结束会话
            connection.release();
            })
        })
    })

}


module.exports = {
    query,
    add,
    update
}