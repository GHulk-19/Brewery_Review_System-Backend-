const User = require("../models/Users");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.body.token.split(" ")[1];
    // console.log("hello from middleware")
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};