const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();
const tokenValidator= require('../middlewares/validators/tokenValidator');
const Cart = require("../models/cartModel");


router.get("/single",tokenValidator, async (req, res) => {
 
 
  try {
    document = await Product.findById(req.query.id).lean().exec();
    if(!req.body.verifyStatus)
    document.cartStatus=false

    else{
      document.cartStatus=true

      const data=await Cart.findOne({$and:[{user_id:req.body.user_id},{status:false},{product_id:req.query.id}]})
      if(data===null)
      document.cartStatus=false
      else
      document.cartStatus=true
    }
    
   
    res.status(200).send(document);
  } catch (error) {
    res.status(500).send(error.message);
  }

});
router.get("", async (req, res) => {
  const query =req.query.category
  const page=+(req.query.page)
  const order=+(req.query.order)
  const sort=req.query.sort
  console.log('query',query);
  try {
    NumberOfDocument = await Product.find({category:{$regex: `^${query}`,$options:'i'}}).sort({[sort]:order}).countDocuments().lean().exec()/16
    document= await Product.find({category:{$regex: `^${query}`,$options:'i'}}).sort({[sort]:order}).skip((page-1)*16).limit(16)
    res.status(201).send({totalPages:Math.ceil(NumberOfDocument),data:document});
  } catch (error) {
    res.send(error.message);
  }
});




module.exports = router;
