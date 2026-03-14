const express = require("express");
const cartRouter = express.Router();

const {
  addToCart,
  getUserCart,
  removeCartItem,
  clearCart,
  updateCartQty
} = require("../controller/cart.controller");
const {clientProtect} = require("../middleware/client.middleware")

cartRouter.post("/add", clientProtect, addToCart);
cartRouter.get("/", clientProtect, getUserCart);
cartRouter.delete("/remove/:productId", clientProtect, removeCartItem);
cartRouter.delete("/clear", clientProtect, clearCart);
cartRouter.put("/update", clientProtect, updateCartQty);
module.exports = cartRouter;