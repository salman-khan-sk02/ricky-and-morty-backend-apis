const mongoose = require("mongoose");
const { v4 } = require("uuid");

const additionalDataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

const charactersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4().replace(/\-/g, ""),
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    species: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    gender: {
      type: String,
    },
    origin: {
      type: additionalDataSchema,
    },
    location: {
      type: additionalDataSchema,
    },
    image: {
      type: String,
    },
    episode: [
      {
        type: String,
      },
    ],
    url: {
      type: String,
    },
    created: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "characters",
  }
);

/**
 * @param {String} name
 * @param {String} status
 * @param {String} species
 * @param {String} type
 * @param {String} gender
 * @param {Object} origin
 * @param {Object} location
 * @param {String} image
 * @param {Array} episode
 * @param {String} url
 
 * @returns {Object} new user object created
 */
charactersSchema.statics.createUser = async function (
  name,
  status,
  species,
  type,
  gender,
  origin,
  location,
  image,
  episode,
  url
) {
  try {
    const user = await this.create({
      name,
      status,
      species,
      type,
      gender,
      origin,
      location,
      image,
      episode,
      url,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} name- character Character name
 * @param {String} species- species Species name
 * @return {Object} Character profiles object
 */
charactersSchema.statics.getCharactersByfilters = async function (filter) {
  try {
    const character = await this.find(filter);
    if (!character) throw { error: "No character with this name found" };
    return character;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id, character id
 * @return {Object} character profile object
 */
charactersSchema.statics.getCharacterByCharacterId = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @return {Array} List of all charecters
 */
charactersSchema.statics.getCharacters = async function () {
  try {
    const charecters = await this.find();
    return charecters;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id - id of character
 * @return {Object} - details of action performed
 */
charactersSchema.statics.deleteByCharacterById = async function (id) {
  try {
    const result = await this.deleteOne({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} name- Character name
 * @param {String} species- species Species name
 * @return {Object} User profile object
 */
charactersSchema.statics.checkForDuplicate = async function (name, species) {
  try {
    const user = await this.findOne({ name: name, species: species });
    //if (!user) throw ({ error: 'No user with this username found' });
    return user;
  } catch (error) {
    throw error;
  }
};
/**
 * @param {String} id - id of character
 * @param {Object} update - all the properties that are to be updated
 * @return {Object} - details of action performed
 */
charactersSchema.statics.updateCharacter = async function (id, update) {
  try {
    return this.findOneAndUpdate(
      {
        _id: id,
      },
      update,
      {
        new: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Character", charactersSchema);
