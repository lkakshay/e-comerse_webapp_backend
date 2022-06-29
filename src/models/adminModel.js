
const mongoose =require('mongoose')
const bcrypt=require('bcryptjs')

const AdminSchema= new mongoose.Schema(
    {
       user_name:{type:String,required:true},
       password:{type:String,required:true}
    },
    {
        versionKey:false,
        timestamps:true
    }

)

AdminSchema.pre("save",function(next){
    if(!this.isModified("password")) return next()
    const hash = bcrypt.hashSync(this.password,8)
    this.password=hash
    next()
})


AdminSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  

  


module.exports=mongoose.model("Admin",AdminSchema)