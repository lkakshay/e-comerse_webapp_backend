const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

router.get("/single", async (req, res) => {
 
  try {
    document = await Product.findById(req.query.id).lean().exec();
    res.send(document);
  } catch (error) {
    res.send(error.message);
  }

});
router.get("", async (req, res) => {
  const query =req.query.category
  const page=+(req.query.page)
  const order=+(req.query.order)
  const sort=req.query.sort
  
  try {
    NumberOfDocument = await Product.find({category:{$regex: `^${query}`,$options:'i'}}).sort({[sort]:order}).countDocuments().lean().exec()/16
    document= await Product.find({category:{$regex: `^${query}`,$options:'i'}}).sort({[sort]:order}).skip((page-1)*16).limit(16)
    res.status(201).send({totalPages:Math.ceil(NumberOfDocument),data:document});
  } catch (error) {
    res.send(error.message);
  }
});




module.exports = router;
