const ProjectService = require('../../services/ProjectService');

const ProjectController = {
  createProject: async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const imageUrls = req.files.map(file => file.filename);
      const newProject = await ProjectService.createProject(userId, imageUrls,req.body);
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  },

  updateProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const files = req.files
      const updatedProject = await ProjectService.updateProject(projectId, files,req.body);
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  },

  deleteProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const result = await ProjectService.deleteProject(projectId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const project = await ProjectService.getProject(projectId);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },

  getAllProjects: async (req, res, next) => {
    try {
      const projects = await ProjectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      next(error);
    }
  },

  getAllPaginatedProjects: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await ProjectService.getAllPaginatedProjects(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ProjectController;
