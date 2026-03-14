const Cart = require("../model/cart.model");


// ADD TO CART
const addToCart = async (req, res) => {
  try {

    const userId = req.client._id; 
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {

      const existingProduct = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.client._id }).populate(
      "items.product",
    );

    res.status(200).json({
      success: true,
      cart: cart ? cart.items : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE PRODUCT FROM CART
const removeCartItem = async (req, res) => {
  try {
    const userId = req.client._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CLEAR CART (optional)
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.client._id }, { items: [] });

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE CART QUANTITY
const updateCartQty = async (req, res) => {
  try {

    const userId = req.client._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart"
      });
    }

    // update quantity
    item.quantity = quantity < 1 ? 1 : quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeCartItem,
  clearCart,
  updateCartQty
};
