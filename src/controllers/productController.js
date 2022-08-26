

const express= require('express')
const Product = require('../models/productModel')
const router=express.Router()


router.get("",async(req,res)=>{
    try {
      document= await Product.find().lean().exec()
      res.send(document)
    } catch (error) {
       res.send(error.message)
    }
  })
  router.post("",async(req,res)=>{
    try {
        await Product.create(req.body)
        return res.status(201).send("success")

    } catch (e) {
        res.status(500).send(e.message)
    }
  })

  module.exports=router