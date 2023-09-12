// all of our imports
const express = require('express')
const db = require('../db')

var usersRouter = express.Router()
usersRouter.use(express.json())

usersRouter.get('/', (request,response) => {
    // console.log('req', request)
    response.status(200).json({"users": "router"})
})

//admin endpoint
usersRouter.get('/all', (request,response) => {
    //    make a call to the db, and return the values
    if(request.headers.admin) {
        const queryStatement = "SELECT * FROM users;"
        dbQuery(queryStatement,[],request, response)
    } else {
        response.status(403).json({"Not autorized" : "To perform this action"})
    }
})

usersRouter.get('/:userid', (request,response) => {
    //    make a call to the db, and return the values
    if(request.params.carid) {
        const queryStatement = "SELECT * FROM users WHERE user_id = $1;"
        dbQuery(queryStatement,[request.params.carid],request, response)
    } else {
        response.status(403).json({"Not valid request": "Put user_id in URL"})
    }
})

usersRouter.put('/update/:userid', (request,response) => {
    //    make a call to the db, and return the values
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone
    console.log('body', request.body)
   
      if(request.params.carid) {
        const queryStatement = "UPDATE users SET name=$1, email=$2, phone=$3 WHERE iser_id = $4 RETURNING*;"
        dbQuery(queryStatement,[make,model,year,odometer, request.params.carid],request, response)
    } else {
        response.status(403).json({"Not valid request": "Put car_id in URL"})
    }
})


usersRouter.post('/new', (request,response) => {
    //    make a call to the db, and return the values
    console.log('body', request.body)
    const name = request.body.name
    const email = request.body.email
    const phone = request.body.phone

    console.log('body', request.body)
    const queryStatement = "INSERT INTO users (name, email, phone) VALUES ($1,$2,$3) RETURNING*;"
    dbQuery(queryStatement,[name,email,phone],request, response)
})

//dbQuery queries our DB & also responds to client with DB results directly
const dbQuery = (queryStatement, params, request, response) => {
    db.query(queryStatement, params, (error,result)=>{
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