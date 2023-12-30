const teamService = require('../../services/TeamService');

const TeamController = {
  addTeam: async (req, res, next) => {
    try {
      const savedTeam = await teamService.addTeam(req);
      res.status(201).json(savedTeam);
    } catch (error) {
      next(error);
    }
  },

  updateTeam: async (req, res, next) => {
    try {
      const { teamId } = req.params;
      const updatedTeam = await teamService.update(teamId, req);
      res.json(updatedTeam);
    } catch (error) {
      next(error);
    }
  },

  deleteTeam: async (req, res, next) => {
    try {
      const { teamId } = req.params;
      const result = await teamService.deleteTeam(teamId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getTeam: async (req, res, next) => {
    try {
      const { teamId } = req.params;
      const Team = await teamService.getTeam(teamId);
      res.json(Team);
    } catch (error) {
      next(error);
    }
  },

  getAllTeams: async (req, res, next) => {
    try {
      const Teams = await teamService.getAllTeams();
      res.json(Teams);
    } catch (error) {
      next(error);
    }
  },
  getAllPaginatedTeams: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await teamService.getAllPaginatedTeams(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TeamController;
