const express= require('express')
const connect  = require("./src/configs/db/db")
require('dotenv').config()



const app=express()
const port=process.env.PORT






app.listen(port,async()=>{
    try {
        await connect()
        console.log(`server started at ${port}`)
        
    } catch (e) {
        console.log(e.message)
    } 
})


