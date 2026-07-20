import Project from '../models/Project.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return res.status(200).json(
      new ApiResponse(200, projects, 'Projects retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }
    return res.status(200).json(
      new ApiResponse(200, project, 'Project retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

// POST /api/projects (protected)
export const createProject = async (req, res, next) => {
  try {
    const { 
      title, 
      category, 
      description, 
      client, 
      year, 
      technologies, 
      videoUrl, 
      thumbnail, 
      featured, 
      order 
    } = req.body;

    if (!title || !category || !description) {
      throw new ApiError(400, 'Title, category, and description are required fields');
    }

    const project = new Project({
      title,
      category,
      description,
      client,
      year,
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()) : []),
      videoUrl,
      thumbnail,
      featured: featured === 'true' || featured === true,
      order: order ? Number(order) : 0
    });

    const savedProject = await project.save();

    return res.status(201).json(
      new ApiResponse(201, savedProject, 'Project created successfully')
    );
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id (protected)
export const updateProject = async (req, res, next) => {
  try {
    const { 
      title, 
      category, 
      description, 
      client, 
      year, 
      technologies, 
      videoUrl, 
      thumbnail, 
      featured, 
      order 
    } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    if (title !== undefined) project.title = title;
    if (category !== undefined) project.category = category;
    if (description !== undefined) project.description = description;
    if (client !== undefined) project.client = client;
    if (year !== undefined) project.year = year;
    if (technologies !== undefined) {
      project.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim());
    }
    if (videoUrl !== undefined) project.videoUrl = videoUrl;
    if (thumbnail !== undefined) project.thumbnail = thumbnail;
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (order !== undefined) project.order = Number(order);

    const updatedProject = await project.save();

    return res.status(200).json(
      new ApiResponse(200, updatedProject, 'Project updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id (protected)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }
    return res.status(200).json(
      new ApiResponse(200, null, 'Project deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
