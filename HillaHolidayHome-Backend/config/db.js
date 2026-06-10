require("dotenv").config();
const sql = require("mssql");
const config = {
    user:process.env.db_user,
    password:process.env.db_password,
    server:process.env.db_server,
    database:process.env.db_name,
    port:parseInt(process.env.db_port),
    options:{
        encrypt:true,
        trustServerCertificate:true
    }
};

const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool=>{
    console.log("db connected");
    return pool;
})

.catch(err => {
    console.log("error");
    throw err;
})

module.exports = {sql, poolPromise};
