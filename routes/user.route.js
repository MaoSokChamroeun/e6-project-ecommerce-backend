const express = require("express");
const { signup, signin , sigout , getProfile } = require("../controller/user.controller");
const { restricGuard } = require("../guard/restric.guard");
const { authGuard } = require("../guard/authGuard.guard");
const { protect } = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post("/signup", protect ,restricGuard('admin'), signup);
userRouter.post("/signin",  signin);
userRouter.post("/signout" , protect,sigout);

userRouter.get("/profile" , protect ,restricGuard('admin'),getProfile)

module.exports = userRouter;
