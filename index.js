// all of our imports
const express = require('express')
const db = require('./db')

// our code begins here
const port = 3000
const app = express()
app.use(express.json())

app.get('/', (request,response) => {
    // console.log('req', request)
    response.status(200).json({"unauthorized": "please log in"})
})

app.post('/echo', (req,res)=>{
    // console.log('headers', req.headers)
    // console.log('params', req.query)
    console.log('body', req.body)
    res.status(200).json(req.body)
})

app.post('/async', (request,response) => {
    
    console.log('1. Im calling the bank')
    setTimeout(()=>{
        console.log('3. Bank Calls me back')
        response.status(200).json("task complete")
    }, 10000)

    console.log('2. After I call the bank')
})

app.get('/db', (request,response) => {
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



// first use of callback function - an asynchronous function that 
// returns a value at an unspecified time.
// Notation: 
// (objectReturned) => { our code which can utilize the value of objectReturned}
app.listen(port, ()=>{
    console.log(`Listening on localhost:${port}!`)
})