const express = require("express");

const {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
  getTotalRevenue,
} = require("../controller/payment.controller");
const { clientProtect } = require("../middleware/client.middleware");
const { protect } = require("../middleware/auth.middleware");
const { restricGuard } = require("../guard/restric.guard");

const paymentRouter = express.Router();

// CREATE PAYMENT + GET ALL PAYMENTS
paymentRouter
  .route("/")
  .post(clientProtect , createPayment)
  .get(protect , restricGuard('admin') , getPayments);

// TOTAL REVENUE
paymentRouter.get("/revenue/total", protect , restricGuard('admin') , getTotalRevenue);

// GET ONE PAYMENT + DELETE PAYMENT
paymentRouter
  .route("/:id")
  .get(protect , restricGuard('admin') , getPaymentById)
  .delete(deletePayment);

module.exports = paymentRouter;