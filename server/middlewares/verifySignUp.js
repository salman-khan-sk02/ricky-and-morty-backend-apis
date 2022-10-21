const UserModel = require("../models/user");


const checkDuplicateUsername = async (req, res, next) => {
  // Username
    let isUser = await UserModel.getUserByUsername( req.body.username)

    if (isUser) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    
    return next();
}




const verifySignUp = {
  checkDuplicateUsername,
};

module.exports = verifySignUp;
