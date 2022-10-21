const jwt = require("jsonwebtoken");
const config = require("../config/jwt.js");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  encode: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.getUserByUsername(username);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      const payload = {
        userId: user._id,
      };
      const authToken = jwt.sign(payload, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      req.authToken = authToken;
      next();
    } catch (error) {
      return res.status(400).json({ success: false, message: error.error });
    }
  },
  decode: (req, res, next) => {
    if (!req.headers["authorization"]) {
      return res
        .status(400)
        .json({ success: false, message: "No access token provided" });
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(accessToken, config.secret);
      req.userId = decoded.userId;
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: error.message });
    }
  },
};
