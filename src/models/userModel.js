
const mongoose= require('mongoose')
const bcrypt=require('bcryptjs')


const UserSchema=new mongoose.Schema(
    {
        first_name:{type:String,required:true},
        last_name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        mobile:{type:Number,required:true},
        password:{type:String,required:true}
    }
    ,
    {
        versionKey:false,
        timestamps:true
    }


)

UserSchema.pre("save",function(next){
    if(!this.isModified("password")) return next()
    const hash = bcrypt.hashSync(this.password,8)
    this.password=hash
    next()

})
module.exports=mongoose.model("User",UserSchema)