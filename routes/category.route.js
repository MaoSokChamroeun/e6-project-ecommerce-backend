const express = require('express')
const { createCategory, getCategory, findOneCategory, updateCategory, deletedCategory } = require('../controller/category.controller')
const { protect } = require('../middleware/auth.middleware')
const { restricGuard } = require('../guard/restric.guard')
const { clientProtect } = require('../middleware/client.middleware')

const categoryRouter = express.Router()

categoryRouter.route('/')
            .post(protect , restricGuard('admin'), createCategory)
            .get(protect , restricGuard('admin','user'), getCategory)   


categoryRouter.route('/public')
                .get( getCategory);            
categoryRouter.route('/:id')
            .get(protect , restricGuard('admin', 'user') , findOneCategory)
            .put(protect , restricGuard('admin') , updateCategory)
            .delete(protect , restricGuard('admin') , deletedCategory)
module.exports = categoryRouter