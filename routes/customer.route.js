const express = require('express')
const { createCustomer, getCustomer, findOneCustomer } = require('../controller/customer.controller')
const {restricGuard} = require('../guard/restric.guard')
const {protect} = require('../middleware/auth.middleware')
const customersSchema = express.Router()

customersSchema.route('/')
                .post(protect , restricGuard('admin') ,createCustomer)
                .get(protect, restricGuard('admin', 'user'), getCustomer)

customersSchema.route('/:id')
            .get(protect , restricGuard('admin' , 'user') , findOneCustomer)
module.exports = customersSchema