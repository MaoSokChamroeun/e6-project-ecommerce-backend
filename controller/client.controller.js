
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Client = require("../model/client.model");
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const clientAlreadyExists = await Client.findOne({ email });

    if (clientAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const client = await Client.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        id: client._id,
        username: client.username,
        email: client.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email }).select("+password");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "client not found",
      });
    }

    const isMatch = await bcrypt.compare(password, client.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is invalid",
      });
    }

    const token = jwt.sign(
      { id: client._id,},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    client.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      client: {
        username : client.username,
        email: client.email,
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
      secure: false,
      sameSite: "lax",
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
      data: req.client,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, sigout, getProfile };
