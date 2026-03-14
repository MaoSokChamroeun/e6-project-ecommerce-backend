const express = require("express");
const {createProduct, getAllProducts, getProductsByCategory, findOneProduct, productUpdate, productDeleted} = require("../controller/product.controller");
const { uploadProductFile } = require("../controller/upload.controller");
const { protect } = require("../middleware/auth.middleware");
const { restricGuard } = require("../guard/restric.guard");
const { clientProtect } = require("../middleware/client.middleware");

const productRouter = express.Router();

productRouter.route('/')
            .post(protect , restricGuard('admin') , uploadProductFile, createProduct)
            .get(protect , restricGuard('admin' , 'user') , getAllProducts)

productRouter.route('/:id')
            .get(protect , restricGuard('admin' , 'user') , findOneProduct)
            .put(protect , restricGuard('admin') , uploadProductFile , productUpdate)
            .delete(protect , restricGuard('admin') , productDeleted)


productRouter.route('/client/public')
            .get(getAllProducts)

productRouter.route("/client/public/:id")
            .get(findOneProduct)
productRouter.route('/products/category/:slug')
            .get(getProductsByCategory)
module.exports = productRouter;