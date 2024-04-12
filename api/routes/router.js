const express = require('express');
const router = express.Router();
const employeeController = require('../Contoller/empolyeeController');
// Create a new employee
router.post('/employees', employeeController.createEmployee);

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Get a single employee by ID
router.get('/employees/:id', employeeController.getEmployeeById);

// Delete an employee by ID
router.delete('/employees/:id', employeeController.deleteEmployee);

// Update an employee by ID
router.put('/employees/:id', employeeController.updateEmployee);

module.exports = router;