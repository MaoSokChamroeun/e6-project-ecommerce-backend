const express = require("express");
const inventoryRouter = express.Router();
const {
  getAllInventory,
  getInventoryByProduct,
  stockIn,
  stockOut,
  adjustStock,
} = require("../controller/inventory.controller");

inventoryRouter.get("/", getAllInventory);
inventoryRouter.get("/:productId", getInventoryByProduct);

inventoryRouter.post("/stock-in", stockIn);
inventoryRouter.post("/stock-out", stockOut);
inventoryRouter.post("/adjust", adjustStock);

module.exports = inventoryRouter;