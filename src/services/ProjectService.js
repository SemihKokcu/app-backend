const Project = require('../models/Project');
const deleteImage = require('../utils/imageCleaner');
const mongoose = require('mongoose');
const ProjectService = {
  createProject: async (userId, imageUrls, data) => {
    try {
      const newProject = new Project( {  creator: userId ? userId : new mongoose.Types.ObjectId(), imageUrls, ...data });
      await newProject.save();
      return newProject;
    } catch (error) {
      throw error;
    }
  },

  updateProject: async (id, files, data) => {
    try {
      const project = await Project.findById(id);
      console.log(project.imageUrls);
      if (files.length > 0) {
        const newImageUrls = files.map(file => file.filename);
        project.imageUrls?.map(imageUrl => {
          deleteImage(imageUrl);
        });
        project.imageUrls = newImageUrls;
      }
      project.name = data.name;
      project.descp = data.descp;
      project.primaryImgUrl = data.primaryImgUrl;
      project.status = data.status;
      project.author = data.author;
      const updatedProject = await project.save();
      return updatedProject;
    } catch (error) {
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      const project = await Project.findById(id);

      if (!project) {
        throw new Error('Project not found');
      }

      const imageUrlsToDelete = [...project.imageUrls];

      const deletedProject = await Project.findByIdAndDelete(id);

      if (!deletedProject) {
        throw new Error('Project could not be deleted');
      }
      imageUrlsToDelete.map((imageUrl) => {
        deleteImage(imageUrl);
      });
      return deletedProject;
    } catch (error) {
      throw error;
    }
  },

  getProject: async (id) => {
    try {
      const project = await Project.findById(id);

      if (!project) {
        throw new Error('Project not found');
      }

      return project;
    } catch (error) {
      throw error;
    }
  },

  getAllProjects: async () => {
    try {
      const projects = await Project.find();
      return projects;
    } catch (error) {
      throw error;
    }
  },

  getAllPaginatedProjects: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [projects, totalCount,totalCountCompletedProject] = await Promise.all([
        Project.find().limit(parseInt(limit)).skip(startIndex),
        Project.countDocuments(),
        Project.countDocuments({status:'Tamamlandı'})
      ]);

      const results = {
        projects,
        pagination: {
          totalCount,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
          totalCountCompletedProject
        },
      };

      return results;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ProjectService;
