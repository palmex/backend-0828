// all of our imports
const express = require('express')

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

// first use of callback function - an asynchronous function that 
// returns a value at an unspecified time.
// Notation: 
// (objectReturned) => { our code which can utilize the value of objectReturned}
app.listen(port, ()=>{
    console.log(`Listening on localhost:${port}!`)
})