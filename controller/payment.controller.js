const Payment = require("../model/payment.model");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const Cart = require("../model/cart.model");


// CREATE PAYMENT (Fake Checkout)
const createPayment = async (req, res) => {
  try {

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required"
      });
    }

    // Find order
    const order = await Order
      .findById(orderId)
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Prevent double payment
    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order already paid"
      });
    }

    if (!order.totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Order totalAmount missing"
      });
    }

    // Check stock and reduce stock
    for (const item of order.items) {

      const product = item.product;

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}`
        });
      }

      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Create payment
    const payment = await Payment.create({
      order: order._id,
      amount: order.totalAmount,
      method: "fakepay",
      status: "success",
      transactionId: `FAKE_${Date.now()}`
    });

    // Update order status
    order.paymentStatus = "paid";
    order.orderStatus = "processing";
    await order.save();

    // Clear user cart safely
    const cart = await Cart.findOne({ user: order.user });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment successful",
      data: payment
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET ALL PAYMENTS
const getPayments = async (req, res) => {
  try {

    const payments = await Payment
      .find()
      .populate("order")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET SINGLE PAYMENT
const getPaymentById = async (req, res) => {
  try {

    const payment = await Payment
      .findById(req.params.id)
      .populate("order");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// DELETE PAYMENT
const deletePayment = async (req, res) => {
  try {

    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// TOTAL REVENUE
const getTotalRevenue = async (req, res) => {
  try {

    const revenue = await Payment.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue =
      revenue.length > 0 ? revenue[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      totalRevenue
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
  getTotalRevenue
};