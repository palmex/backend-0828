const express = require('express')
const db = require('../db')

var usersRouter = express.Router()
usersRouter.use(express.json())


// admin endpoint
usersRouter.get('/all', (request,response) => {
    //    make a call to the db, and return the values
    if (request.headers.admin) {
        const queryStatement = "SELECT * FROM users;"
        dbQuery(queryStatement, [], request,response)
    } else {
        response.status(403).json({"Not Authorized":"To perform this function"})
    }
})

usersRouter.get('/myusers/:userId', (request,response) => {
    //    lookup carId details
    if (request.params.userId) {
        const queryStatement = "SELECT * FROM users WHERE user_id = $1;"
        dbQuery(queryStatement, [request.params.userId], request,response)
    } else {
        response.status(403).json(
            {"Not valid request":"Please put userId in URL"})
    }
})

usersRouter.put('/update/:userId', (request,response) => {
    //    lookup carId details

    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone

    if (request.params.userId) {
        const queryStatement = "UPDATE users SET \
    name=$1, email=$2, phone=$3  WHERE user_id = $4 RETURNING*;"
        dbQuery(queryStatement, [name, email, phone, request.params.userId], request,response)
    } else {
        response.status(403).json(
            {"Not valid request":"Please put userId in URL"})
    }
})

usersRouter.post('/new', (request,response) => {
    //    make a call to the db, and return the values
    console.log('body',request.body)
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone

    const queryStatement = "INSERT INTO users (name, email, phone) VALUES \
                            ($1,$2,$3) RETURNING*;"
    dbQuery(queryStatement, [name, email, phone], request,response)
})

usersRouter.delete('/delete/:userId', (request,response) => {
    //    lookup userId details
    if (request.params.userId) {
        const queryStatement = "DELETE FROM users WHERE user_id = $1;"
        dbQuery(queryStatement, [request.params.userId], request,response)
    } else {
        response.status(403).json(
            {"Not valid request":"Please put userId in URL"})
    }
})

// dbQuery queries our DB & also responds to client with DB results directly
const dbQuery = (queryStatement, params, request,response) => {
    db.query(queryStatement,params, (error,result)=>{
        if(error){
            response.status(500).json(error)
        } else {
            // console.log(result)
            // parse out only the returned rows
            resBody = result.rows
            response.status(200).json(resBody)
        }
    })
}



module.exports = usersRouter