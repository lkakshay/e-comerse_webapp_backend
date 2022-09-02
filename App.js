const express= require('express')
const connect  = require("./src/configs/db/db")
const app=express()
require('dotenv').config()
const port=process.env.PORT

const cors=require('cors')
app.use(cors({
    origin:'http://localhost:3000'
}))


app.use(express.json())

//routes
const {registerValidator,registerValidatorResult}=require('./src/middlewares/validators/regesterValidator')
const regesterController=require('./src/controllers/authController/registerController')
app.post("/api/register",registerValidator,registerValidatorResult,regesterController)


//admin routes
const AdminLoginController=require('./src/controllers/authController/AdminLoginController')
app.post('/api/admin',AdminLoginController)

 app.get('/',(req,res)=>{
    res.send('lk')
 })


 //product routes

 const productController=require('./src/controllers/productController')
 app.use('/api/products',productController)
 


//server 
app.listen(port,async()=>{
    try {
        await connect()
        console.log(`server started at ${port}`)
        
    } catch (e) {
        console.log(e.message)
    } 
})



