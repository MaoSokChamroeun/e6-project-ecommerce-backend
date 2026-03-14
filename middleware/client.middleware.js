const jwt = require("jsonwebtoken");
const Client = require("../model/client.model");

const clientProtect = async (req, res, next) => {
  try {

    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const client = await Client.findById(decoded.id).select("-password");

    if (!client) {
      return res.status(401).json({
        success: false,
        message: "Client not found",
      });
    }

    req.client = client;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });

  }
};

module.exports = { clientProtect };