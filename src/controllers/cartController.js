const express = require("express");
const Cart = require("../models/cartModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  if (!req.body.verifyStatus) return res.send(401).send("invalid token");

  const { product_id, user_id } = req.body;
  const count = 1;
  const status = false;
  const later = false;

  try {
    await Cart.create({ product_id, count, status, user_id, later });
    return res.status(201).send("success");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/items", async (req, res) => {
  if (!req.body.verifyStatus) return res.send(401).send("invalid token");
  try {
    const cartItems = await Cart.find({
      $and: [
        { user_id: req.body.user_id },
        { later: false },
        { status: false },
      ],
    })
      .populate("product_id")
      .lean()
      .exec();
    return res.status(201).send(cartItems);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.get("/later/items", async (req, res) => {
  if (!req.body.verifyStatus) return res.send(401).send("invalid token");
  try {
    const cartItems = await Cart.find({
      $and: [{ user_id: req.body.user_id }, { later: true }, { status: false }],
    })
      .populate("product_id")
      .lean()
      .exec();
    return res.status(201).send(cartItems);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/update", async (req, res) => {
  if (!req.body.verifyStatus) return res.send(401).send("invalid token");

  try {
    const data = await Cart.findByIdAndUpdate(
      req.query.id,
      req.body.updateData
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(e.message);
  }
});

router.delete("/delete", async (req, res) => {
    if (!req.body.verifyStatus) return res.send(401).send("invalid token");

    try {
      const data = await Cart.findByIdAndDelete(req.query.id)
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

module.exports = router;
