const axios = require("axios");

const CharacterModel = require("../models/characters.js");
module.exports = {
  createCharacter: async (req, res) => {
    try {
      const {
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
      } = req.body;
      const character = await CharacterModel.createUser(
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
      );
      return res.status(200).json({ success: true, character });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  deleteCharacter: async (req, res) => {
    try {
      const characterDeleted = await CharacterModel.deleteByCharacterById(
        req.params.id
      );
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${characterDeleted.deletedCount} items.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  updateCharecter: async (req, res) => {
    try {
      const characterDeleted = await CharacterModel.updateCharacter(
        req.params.id,
        req.body
      );
      return res.status(200).json({ success: true, data: characterDeleted });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  getApiCharacters: async (req, res) => {
    try {
      let params = req.query;
      if (Object.keys(params).length === 0) {
        return res
          .status(500)
          .json({ success: false, error: "please enter a name or a species" });
      } else {
        if (params.name && params.species) {
          const config = {
            method: "get",
            url: `https://rickandmortyapi.com/api/character/?name=${params.name}&species=${params.species}`,
          };
          const result = await axios(config);
          return res.status(200).json({ success: true, data: result.data });
        } else if (params.name) {
          const config = {
            method: "get",
            url: `https://rickandmortyapi.com/api/character/?name=${params.name}`,
          };
          const result = await axios(config);
          return res.status(200).json({ success: true, data: result.data });
        } else if (params.species) {
          const config = {
            method: "get",
            url: `https://rickandmortyapi.com/api/character/?species=${params.species}`,
          };
          const result = await axios(config);
          return res.status(200).json({ success: true, data: result.data });
        } else {
          return res.status(500).json({
            success: false,
            error: "please enter a name or a species",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  getCharacters: async (req, res) => {
    try {
      let filters = {};
      let params = req.query;
      if (Object.keys(params).length === 0) {
        const characters = await CharacterModel.getCharacters();
        return res.status(200).json({ success: true, data: characters });
      } else {
        if (params.hasOwnProperty("name")) {
          filters.name = params.name;
        }
        if (params.hasOwnProperty("status")) {
          filters.status = params.status;
        }
        if (params.hasOwnProperty("species")) {
          filters.species = params.species;
        }
        if (params.hasOwnProperty("type")) {
          filters.type = params.type;
        }
        if (params.hasOwnProperty("gender")) {
          filters.gender = params.gender;
        }
        if (filters) {
          const characters = await CharacterModel.getCharactersByfilters(
            filters
          );
          return res.status(200).json({ success: true, data: characters });
        }
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
