const { response } = require('express')
const express = require('express')
const db = require('../db')

var carsRouter = express.Router()
carsRouter.use(express.json())


// admin endpoint
carsRouter.get('/all', (request,response) => {
    //    make a call to the db, and return the values
    if (request.headers.admin) {
        const queryStatement = "SELECT * FROM cars;"
        dbQuery(queryStatement, [], request,response)
    } else {
        response.status(403).json({"Not Authorized":"To perform this function"})
    }
})

carsRouter.get('/mycars/:userId', (request,response) => {
    //    lookup carId details
    if (request.params.userId) {
        const queryStatement = "SELECT * FROM cars WHERE user_id = $1;"
        dbQuery(queryStatement, [request.params.userId], request,response)
    } else {
        response.status(403).json(
            {"Not valid request":"Please put userId in URL"})
    }
})

carsRouter.put('/update/:carId', (request,response) => {
    //    lookup carId details

    const make = request.body.make
    const model = request.body.model
    const year = request.body.year
    const odometer = request.body.odometer

    if (request.params.carId) {
        const queryStatement = "UPDATE cars SET \
    make=$1, model=$2, year=$3, odometer=$4 WHERE car_id = $5 RETURNING*;"
        dbQuery(queryStatement, [make, model, year, odometer,request.params.carId], request,response)
    } else {
        response.status(403).json(
            {"Not valid request":"Please put userId in URL"})
    }
})

carsRouter.post('/new', (request,response) => {
    //    make a call to the db, and return the values
    console.log('body',request.body)
    const make = request.body.make
    const model = request.body.model
    // if (!model is string){
    //     response.status(400).json("this needs to a string")
    // }
    const year = request.body.year
    const odometer = request.body.odometer

    const queryStatement = "INSERT INTO cars (make, model, year, odometer) VALUES \
                            ($1,$2,$3,$4) RETURNING*;"
    dbQuery(queryStatement, [make, model, year, odometer], request,response)
})

carsRouter.delete('/delete/:carId', (request,response) => {
    //    lookup carId details
    if (request.params.carId) {
        const queryStatement = "DELETE FROM cars WHERE car_id = $1;"
        dbQuery(queryStatement, [request.params.carId], request,response)
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



module.exports = carsRouter