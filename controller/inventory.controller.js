const Inventory = require("../model/inventory.model");
const Product = require("../model/product.model");

// Get all inventory history
const getAllInventory = async (req, res) => {
  try {
    const inventories = await Inventory.find()
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: inventories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get inventory by product
const getInventoryByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const inventory = await Inventory.find({ product: productId })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Stock IN (add stock)
const stockIn = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.stock += Number(quantity);
    await product.save();

    const inventory = await Inventory.create({
      product: productId,
      type: "in",
      quantity,
      note,
    });

    res.status(200).json({
      success: true,
      message: "Stock added successfully",
      data: inventory,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Stock OUT (reduce stock)
const stockOut = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock",
      });
    }

    product.stock -= Number(quantity);
    await product.save();

    const inventory = await Inventory.create({
      product: productId,
      type: "out",
      quantity,
      note,
    });

    res.status(200).json({
      success: true,
      message: "Stock removed successfully",
      data: inventory,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Adjust stock
const adjustStock = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.stock = Number(quantity);
    await product.save();

    const inventory = await Inventory.create({
      product: productId,
      type: "adjustment",
      quantity,
      note,
    });

    res.status(200).json({
      success: true,
      message: "Stock adjusted successfully",
      data: inventory,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getAllInventory,
  getInventoryByProduct,
  stockIn,
  stockOut,
  adjustStock,
};