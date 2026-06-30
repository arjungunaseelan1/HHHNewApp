require("dotenv").config();
const sql = require("mssql");

console.log("Loading db.js");

const config = {
    user: process.env.db_user,
    password: process.env.db_password,
    server: process.env.db_server,
    database: process.env.db_name,
    port: Number(process.env.db_port),
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    connectionTimeout: 30000,
    requestTimeout: 30000
};

console.log("Creating connection pool...");

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("✅ Database connected");
        return pool;
    })
    .catch(err => {
        console.error("❌ Initial DB connection failed");
        console.error(err);
        throw err;
    });

module.exports = { sql, poolPromise };