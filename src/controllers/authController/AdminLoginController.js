

const Admin=require('../../models/adminModel')
const createToken = require('../../utils/helpers/createToken')


module.exports=async(req,res)=>{

   
    try {
        const admin= await Admin.findOne({user_name:req.body.user_name})

        if(!admin)
        return res.status(400).send("Please try another email or password")
        
        const match= admin.checkPassword(req.body.password)

        if(!match)
        return res.status(400).send("Please try another email or password")

       const token=createToken(admin)

        return res.status(200).send({user_name:admin.user_name,token})


    } catch (e) {

        res.status(500).send(e.message)
    }
}