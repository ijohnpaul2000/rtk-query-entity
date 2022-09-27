const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../models/").User;

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        console.log(token);
        const decoded = jwt.verify(token, "CAPSTONE_CEIT");
        console.log({ decoded });
        //find the user by id
        const user = await User.findOne({
          where: { id: decoded.id },
        });
        console.log(user);
        //attach the user to the request object
        req.user = user;

        next();
      }
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized token expired, login again");
    }
  } else {
    console.log("Why error");
    throw new Error("There is no token attached to the header");
  }
});

module.exports = { protect };
