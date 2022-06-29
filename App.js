const express= require('express')
const connect  = require("./src/configs/db/db")
const app=express()
const port=process.env.PORT

app.use(express.json())

//routes
const {registerValidator,registerValidatorResult}=require('./src/middlewares/validators/regesterValidator')
const regesterController=require('./src/controllers/authController/registerController')
app.post("/regester",registerValidator,registerValidatorResult,regesterController)


//admin routes
const AdminLoginController=require('./src/controllers/authController/AdminLoginController')
app.post('/admin',AdminLoginController)

//server 
app.listen(port,async()=>{
    try {
        await connect()
        console.log(`server started at ${port}`)
        
    } catch (e) {
        console.log(e.message)
    } 
})



