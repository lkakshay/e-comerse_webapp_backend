
const User=require('../../models/userModel')
const tokenGenerator=require('../../utils/helpers/createToken')

module.exports=async(req,res)=>{
    try {
        const user=await User.create(req.body)
        const token=tokenGenerator(user)
        return res.status(201).send({ user,token})

    } catch (e) {
        res.send(e.message)
    }
}