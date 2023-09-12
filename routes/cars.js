// all of our imports
const express = require('express')
const db = require('../db')

var carsRouter = express.Router()
carsRouter.use(express.json())

carsRouter.get('/', (request,response) => {
    // console.log('req', request)
    response.status(200).json({"cars": "router"})
})

//admin endpoint
carsRouter.get('/all', (request,response) => {
    //    make a call to the db, and return the values
    if(request.headers.admin) {
        const queryStatement = "SELECT * FROM cars;"
        dbQuery(queryStatement,[],request, response)
    } else {
        response.status(403).json({"Not autorized" : "To perform this action"})
    }
})

carsRouter.get('/:carid', (request,response) => {
    //    make a call to the db, and return the values
    if(request.params.carid) {
        const queryStatement = "SELECT * FROM cars WHERE car_id = $1;"
        dbQuery(queryStatement,[request.params.carid],request, response)
    } else {
        response.status(403).json({"Not valid request": "Put car_id in URL"})
    }
})

carsRouter.put('/update/:carid', (request,response) => {
    //    make a call to the db, and return the values
    const make = request.body.make
    const model = request.body.model
    const year = request.body.year
    const odometer = request.body.odometer
    console.log('body', request.body)
   
      if(request.params.carid) {
        const queryStatement = "UPDATE cars SET make=$1, model=$2, year=$3, odometer= $4WHERE car_id = $5 RETURNING*;"
        dbQuery(queryStatement,[make,model,year,odometer, request.params.carid],request, response)
    } else {
        response.status(403).json({"Not valid request": "Put car_id in URL"})
    }
})


carsRouter.post('/new', (request,response) => {
    //    make a call to the db, and return the values
    console.log('body', request.body)
    const make = request.body.make
    const model = request.body.model
    const year = request.body.year
    const odometer = request.body.odometer
    console.log('body', request.body)
    const queryStatement = "INSERT INTO cars (make, model, year, odometer) VALUES ($1,$2,$3,$4) RETURNING*;"
    dbQuery(queryStatement,[make,model,year,odometer],request, response)
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

module.exports = carsRouter