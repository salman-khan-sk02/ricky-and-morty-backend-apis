// utils
// models
const UserModel = require("../models/user.js");
const bcrypt = require("bcryptjs");

module.exports = {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      // const validation = makeValidation(types => ({
      //   payload: req.body,
      //   checks: {
      //       username: { type: types.string },
      //       firstName: { type: types.string },
      //       lastName: { type: types.string },
      //   }
      // }));
      // if (!validation.success && !validator.isEmail(req.body.email)) return res.status(400).json({ ...validation });

      const { username, password } = req.body;
      let pass = bcrypt.hashSync(password, 8);
      const user = await UserModel.createUser(username, pass);
      return res
        .status(200)
        .json({
          success: true,
          message: `user has been created with the username ${user.username}`,
        });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
