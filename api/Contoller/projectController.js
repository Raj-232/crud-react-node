const Projects = require('../Model/projects');

const createProject = async (req, res) => {
    try {
        const projects = await Projects.create(req.body);
        res.status(201).json({ message: 'Projects created successfully', projects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create projects' });
    }
};

const getAllProjects = async (req, res) => {
    const userId = req.params.userId;
    if (!isNaN(userId)|| !userId) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
    try {
        const tasks = await Projects.findAll({
            where: {
                userId: userId
            },
        });
        res.status(200).json({ message: 'get projects successfully', data: tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};

const getProjectsById = async (req, res) => {
    try {
        const projects = await Projects.findByPk(req.params.id);
        if (!projects) {
            return res.status(404).json({ message: 'Projects not found' });
        }
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

const updateProjects = async (req, res) => {
    try {
        const projects = await Projects.findByPk(req.params.id);
        if (!projects) {
            return res.status(404).json({ message: 'Projects not found' });
        }
        await projects.update(req.body);
        res.json({ message: 'Projects updated successfully', projects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update projects' });
    }
};

const deleteProjects = async (req, res) => {
    try {
        const projects = await Projects.findByPk(req.params.id);
        if (!projects) {
            return res.status(404).json({ message: 'Projects not found' });
        }
        await projects.destroy();
        res.json({ message: 'Projects deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete projects' });
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectsById,
    updateProjects,
    deleteProjects
};
