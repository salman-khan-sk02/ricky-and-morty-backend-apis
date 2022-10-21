const controller = require("../controllers/user");
const { encode } = require("../middlewares/authJwt");
const { verifySignUp } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/users/signup",
    verifySignUp.checkDuplicateUsername,
    controller.onCreateUser
  );

  app.post("/users/signin", encode, (req, res, next) => {
    return res.status(200).json({
      success: true,
      authorization: req.authToken,
    });
  });
};
