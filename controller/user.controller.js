const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const userAlreadyExits = await User.find({ email });
    if (!userAlreadyExits) {
      return res.status(401).json({
        success: false,
        message: "Please signup your email",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username : username,
      email: email,
      password: hash,
      role: role,
    });
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "You Signup Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is invalid",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        username : user.username,
        email: user.email,
        role: user.role,
      },
      token,
      expiresIn: "1d",
    });
  } catch (error) {
    next(error);
  }
};

const sigout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production" ? true : false,
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, sigout, getProfile };
