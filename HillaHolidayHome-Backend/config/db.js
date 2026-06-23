require("dotenv").config();
const sql = require("mssql");
console.log("DB_USER:", process.env.db_user);
console.log("DB_SERVER:", process.env.db_server);
console.log("DB_NAME:", process.env.db_name);
console.log("DB_PORT:", process.env.db_port);

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
