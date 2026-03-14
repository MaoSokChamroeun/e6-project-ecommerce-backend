const express = require('express')
const{signin , signup , getProfile , logout, sigout} = require('../controller/client.controller')
const {clientProtect} = require('../middleware/client.middleware')
const clientRouter = express.Router()

clientRouter.post("/signup" , signup);
clientRouter.post("/signin" , signin);
clientRouter.post("/signout" , clientProtect , sigout)

clientRouter.get("/user-profile" , clientProtect , getProfile)
module.exports = clientRouter