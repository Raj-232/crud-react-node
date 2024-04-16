const Task = require('../Model/task');
const Projects = require('../Model/projects');
const Employee = require('../Model/empolyee');
const taskStausChange = async (req, res) => {
    const taskId = req.params.taskId;
    const { status } = req.body;

    try {
        // Find the task by its ID
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the status attribute
        task.status = status;

        // Save the changes to the database
        await task.save();

        res.json({ message: 'Task status updated successfully' });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create task' });
    }
};

const getAllTasks = async (req, res) => {
    const userId = req.params.userId;
    if (!isNaN(userId)|| !userId) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
    try {
        const tasks = await Task.findAll({
            where: {
                userId: userId
            },
            include: [
                { model: Employee },
                { model: Projects }
            ]
        },
            req.params.userId
        );
        // Transforming the response
        const formattedTasks = tasks.map(task => ({
            TaskID: task.TaskID,
            name: task.name,
            description: task.description,
            status: task.status,
            deadline: task.deadline.toISOString().split('T')[0], // Format deadline as 'YYYY-MM-DD'
            projectName: task.project.project_name,
            employeeName: task.employee.name
        }));
        res.status(200).json({
            message: 'get task successfully',
            data: formattedTasks
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.update(req.body);
        res.json({ message: 'Task updated successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete task' });
    }
};

module.exports = {
    taskStausChange,
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
