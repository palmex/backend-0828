// db/index.js file
// import a library for interfacing with postgres!

const Pool = require('pg').Pool
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
    user:process.env.DB_USER, 
    host:process.env.DB_HOST, 
    port:process.env.DB_PORT, 
    password:process.env.DB_PW,
    database:process.env.DB_NAME,
})

module.exports = pool