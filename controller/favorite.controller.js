const Favorite = require("../model/favorite.model");

// Add favorite
const addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;

    const exist = await Favorite.findOne({
      client: req.client._id,
      product: productId,
    });

    if (exist) {
      return res.status(400).json({
        message: "Product already in favorites",
      });
    }

    const favorite = await Favorite.create({
      client: req.client._id,
      product: productId, // important
    });

    res.status(201).json({
      success: true,
      data: favorite,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ client: req.client._id })
      .populate("product");

    res.json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove favorite
const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;

    await Favorite.findOneAndDelete({
      client: req.client._id,
      product: productId,
    });

    res.json({
      success: true,
      message: "Favorite removed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};