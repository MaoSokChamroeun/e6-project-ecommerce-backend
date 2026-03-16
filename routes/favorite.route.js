const express = require("express");
const favoriteRouter = express.Router();
const { clientProtect } = require("../middleware/client.middleware");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controller/favorite.controller");

favoriteRouter.route("/add")
                .post(clientProtect, addFavorite);
favoriteRouter.route("/my")
            .get(clientProtect, getFavorites);
favoriteRouter.route("/remove/:productId")
            .delete(clientProtect, removeFavorite);

module.exports = favoriteRouter;