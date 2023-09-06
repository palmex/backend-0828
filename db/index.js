// db/index.js file
// import a library for interfacing with postgres!

const Pool = require('pg').Pool

const pool = new Pool({
    user:'postgres', 
    host:'localhost', 
    port:5432, 
    password:'PosgresRocks123!',
    database:'stellantis',
})

module.exports = pool;