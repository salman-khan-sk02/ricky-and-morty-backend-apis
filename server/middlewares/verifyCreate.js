const CharacterModel = require("../models/characters.js");

const checkDuplicateCharacter = async (req, res, next) => {
  let isCharecter = await CharacterModel.checkForDuplicate(
    req.body.name,
    req.body.species
  );

  if (isCharecter) {
    res.status(400).send({ message: "Failed! character already exists!" });
    return;
  }

  return next();
};
const verifyCreate = {
  checkDuplicateCharacter,
};

module.exports = verifyCreate;
