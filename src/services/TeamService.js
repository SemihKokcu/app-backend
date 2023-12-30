const Team = require("../models/Team");
const deleteImage = require("../utils/imageCleaner");

const TeamService = {
  addTeam: async (req) => {
    try {
      const imageUrl = req.file.filename;

      const newTeam = new Team({
        imageUrl: imageUrl,
        ...req.body,
      });

      const savedTeam = await newTeam.save();
      return savedTeam;
    } catch (error) {
      throw error;
    }
  },

  update: async (teamId, req) => {
    try {
      const team = await Team.findById(teamId);
      if (!team) {
        throw new Error("Team not found");
      }

      const newImageUrl = req.file?.filename;
      if (newImageUrl) {
        deleteImage(team.imageUrl);
        team.imageUrl = newImageUrl;
      }
      team.name = req.body.name;
      team.position = req.body.position;

      const updatedTeam = await team.save();
      return updatedTeam;
    } catch (error) {
      throw error;
    }
  },

  deleteTeam: async (teamId) => {
    try {
      const deletedTeam = await Team.findByIdAndDelete(teamId);
      if (!deletedTeam) {
        throw { message: "Team not found" };
      }
      deleteImage(deletedTeam.imageUrl);
      return { message: "Team deleted successfully" };
    } catch (error) {
      throw error;
    }
  },

  getTeam: async (teamId) => {
    try {
      const team = await Team.findById(teamId);

      if (!team) {
        throw { message: "Team not found" };
      }

      return team;
    } catch (error) {
      throw error;
    }
  },

  getAllTeams: async () => {
    try {
      const teams = await Team.find();
      return teams;
    } catch (error) {
      throw error;
    }
  },
  getAllPaginatedTeams: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [teams, totalCount] = await Promise.all([
        Team.find().limit(parseInt(limit)).skip(startIndex),
        Team.countDocuments(),
      ]);

      const results = {
        teams,
        pagination: {
          totalCount,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
        },
      };

      return results;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = TeamService;
