const express = require("express");
const connect = require("./src/configs/db/db");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

//auth routes
const {
  registerValidator,
  registerValidatorResult,
} = require("./src/middlewares/validators/regesterValidator");
const regesterController = require("./src/controllers/authController/registerController");
app.post(
  "/api/register",
  registerValidator,
  registerValidatorResult,
  regesterController
);

const loginController = require("./src/controllers/authController/loginController");
app.post("/api/login", loginController);

//product routes

const productController = require("./src/controllers/productController");
app.use("/api/products", productController);

//car routes

const CartController = require("./src/controllers/cartController");
const tokenValidator = require("./src/middlewares/validators/tokenValidator");

app.use("/api/cart", tokenValidator, CartController);

//server
app.listen(port, async () => {
  try {
    await connect();
    console.log(`server started at ${port}`);
  } catch (e) {
    console.log(e.message);
  }
});
