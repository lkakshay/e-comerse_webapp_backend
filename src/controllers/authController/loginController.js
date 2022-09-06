

const User = require('../../models/userModel')
const createToken = require('../../utils/helpers/createToken')


module.exports=async(req,res)=>{
    console.log(req.body)

   
    try {
        const user= await User.findOne({email:req.body.email})

        if(!user)
        return res.status(401).send("1")
        
        const match= user.checkPassword(req.body.password)

        if(!match)
        return res.status(401).send("2")

       const token=createToken(user)

        return res.status(200).send({name:user.name,token})


    } catch (e) {

        res.status(500).send(e.message)
    }
}