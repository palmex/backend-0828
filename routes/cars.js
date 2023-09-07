const express = require('express')
const db = require('../db')

var carsRouter = express.Router()
carsRouter.use(express.json())

carsRouter.get('/all', (request,response) => {
    //    make a call to the db, and return the values
    const queryStatement = "SELECT * FROM cars;"
    db.query(queryStatement, (error,result)=>{
        if(error){
            response.status(500).json(error)
        } else {
            // console.log(result)
            // parse out only the returned rows
            resBody = result.rows
            response.status(200).json(resBody)
        }
    })
})

carsRouter.post('/new', (request,response) => {
    //    make a call to the db, and return the values
    console.log('body',request.body)
    const make = request.body.make
    const model = request.body.model
    const year = request.body.year
    const odometer = request.body.odometer

    const queryStatement = "INSERT INTO cars (make, model, year, odometer) VALUES \
                            ($1,$2,$3,$4) RETURNING*;"
    db.query(queryStatement,[make, model, year, odometer], (error,result)=>{
        if(error){
            response.status(500).json(error)
        } else {
            // console.log(result)
            // parse out only the returned rows
            resBody = result.rows
            response.status(200).json(resBody)
        }
    })
})



module.exports = carsRouter