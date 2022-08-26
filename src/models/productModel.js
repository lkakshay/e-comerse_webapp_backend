const  mongoose  = require("mongoose");

ProductSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        category:{type:String,required:true},
        subcategory:{type:String,required:true},
        price:{type:Number,required:true},
        offer_price:{type:Number,required:true},
        images:{type:Array,required:true},
        isprime:{type:Boolean,required:true},
        description:{type:String,required:true},
        rating:{type:Number,required:true},
        prime:{type:Boolean,required:true},
        brand:{type:"string",required:true},    
     },
     {
         versionKey:false,
         timestamps:true
     }
) 

module.exports=mongoose.model("Product",ProductSchema)