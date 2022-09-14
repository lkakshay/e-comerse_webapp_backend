const mongoose = require("mongoose");

cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    count:{type:Number,required:true},
    status:{type:Boolean,required:true},
    later:{type:Boolean,required:true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
