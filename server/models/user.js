const mongoose = require("mongoose");
const { v4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4().replace(/\-/g, ""),
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/**
 * @param {String} username
 * @param {String} password
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (username, password) {
  try {
    const user = await this.create({ username, password });
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} username- user username
 * @return {Object} User profile object
 */
userSchema.statics.getUserByUsername = async function (username) {
  try {
    const user = await this.findOne({ username: username });
    //if (!user) throw ({ error: 'No user with this username found' });
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {Array} ids- string of user ids
 * @return {Array of Objects} users list
 */
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);
