require("dotenv").config()
const express = require('express')
const port = process.env.PORT;



const routes = require('./routes')

const app = express()



app.use(express.json())
app.use(routes)




app.listen(port, () => {
    console.log("Server started 😁")
})