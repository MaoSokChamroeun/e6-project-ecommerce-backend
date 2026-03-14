const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authGuard = async (req, res, next) => {
  try {
    let token;
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token required",
      });
    }

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const admin = await User.findById(payload.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { authGuard };