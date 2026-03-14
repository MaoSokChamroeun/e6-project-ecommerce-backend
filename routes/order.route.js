const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  fakePayment,
  getOrderCount,
} = require("../controller/order.controller");
const { protect } = require("../middleware/auth.middleware");
const { restricGuard } = require("../guard/restric.guard");
const { clientProtect } = require("../middleware/client.middleware");

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(createOrder)
  .get(protect, restricGuard("admin"), getOrders);

orderRouter
  .route("/client/orders")
  .get(clientProtect, getOrders)
  .post(clientProtect, createOrder);

orderRouter.route("/count").get(getOrderCount);

orderRouter
  .route("/:id")
  .get(protect, restricGuard("admin"), getOrderById)
  .put(protect, restricGuard("admin"), updateOrderStatus)
  .delete(protect, restricGuard("admin"), deleteOrder);

orderRouter
  .route("/client/public/:id")
  .get(clientProtect, getOrderById)
  .put(clientProtect, updateOrderStatus)
  .delete(clientProtect, deleteOrder);

orderRouter.post("/pay", fakePayment);

module.exports = orderRouter;
