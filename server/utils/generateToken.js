const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "CAPSTONE_CEIT";

  return jwt.sign({ id }, secret, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };
