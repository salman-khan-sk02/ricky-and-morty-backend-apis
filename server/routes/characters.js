const controller = require("../controllers/character.js");
const { decode } = require("../middlewares/authJwt");
const { verifyCreate } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/character/create",
    decode,
    verifyCreate.checkDuplicateCharacter,
    controller.createCharacter
  );

  app.delete("/character/delete/:id", decode, controller.deleteCharacter);

  app.put("/character/update/:id", decode, controller.updateCharecter);

  app.get("/character/api/get/", decode, controller.getApiCharacters);

  app.get("/character/get/", decode, controller.getCharacters);
};
