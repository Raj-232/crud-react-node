const express = require('express');
const router = express.Router();
const employeeController = require('../Contoller/empolyeeController');
const userContoller = require('../Contoller/userContoller');
const taskController = require('../Contoller/taskController')
const projectContoller=require('../Contoller/projectController')
const { authenticateToken } = require('../Middleware/authMiddleware');



router.post('/register', userContoller.cretaeUser);
router.post('/login', userContoller.userLogin);

router.post('/employees', authenticateToken, employeeController.createEmployee);
router.get('/user/employees/:userId', authenticateToken, employeeController.getAllEmployees);
router.get('/employees/:id', authenticateToken, employeeController.getEmployeeById);
router.delete('/employees/:id', authenticateToken, employeeController.deleteEmployee);
router.put('/employees/:id', authenticateToken, employeeController.updateEmployee);


router.post('/task',authenticateToken, taskController.createTask);
router.get('/user/task/:userId',authenticateToken, taskController.getAllTasks);
router.get('/task/:id',authenticateToken, taskController.getTaskById);
router.put('/task/:id',authenticateToken, taskController.updateTask);
router.delete('/task/:id',authenticateToken, taskController.deleteTask);
router.put('/task/status/:taskId',authenticateToken, taskController.taskStausChange);


router.post('/projects',authenticateToken, projectContoller.createProject);
router.get('/user/projects/:userId',authenticateToken, projectContoller.getAllProjects);
router.get('/projects/:id',authenticateToken, projectContoller.getProjectsById);
router.put('/projects/:id',authenticateToken, projectContoller.updateProjects);
router.delete('/projects/:id',authenticateToken, projectContoller.deleteProjects);

module.exports = router;