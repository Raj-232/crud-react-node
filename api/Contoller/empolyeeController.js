const Employee = require('../Model/empolyee');

// Create a new employee

const createEmployee = async (req, res) => {
    const { name, email, department, salary,userId } = req.body;
    try {
        if (!name) {
            return res.status(400).json({
                status: 400,
                message: 'Name is required'
            });
        }
        
        // Check if email already exists
        const existingEmployee = await Employee.findOne({ where: { email: email } });
        if (existingEmployee) {
            return res.status(400).json({
                status: 400,
                message: 'Email already exists'
            });
        }

        const newEmp = await Employee.create({
            name, email, department, salary,userId
        });
        res.status(201).json({
            status: 201,
            message: "Employee created successfully",
            data: newEmp
        });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};


// Get all employees
const getAllEmployees = async (req, res) => {
    const userId = req.params.userId;
    if (!isNaN(userId)|| !userId) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
    try {
        const employees = await Employee.findAll({
            where: {
                userId: userId
            },
        });
        res.status(200).json({
            status: 200,
            message: 'Retrieved all employees successfully',
            data: employees
        });
    } catch (error) {
        console.error('Error retrieving employees:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Get a single employee by ID
const getEmployeeById = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({
                status: 404,
                message: 'Employee not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Retrieved employee successfully',
            data: employee
        });
    } catch (error) {
        console.error('Error retrieving employee by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({
                status: 404,
                message: 'Employee not found'
            });
        }
        await employee.destroy();
        res.status(200).json({
            status: 200,
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const { name, email, department, salary,userId } = req.body;
    try {
        if (!name || !email) {
            return res.status(400).json({
                status: 400,
                message: 'Name and email are required'
            });
        }
        let employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({
                status: 404,
                message: 'Employee not found'
            });
        }
        employee.name = name;
        employee.email = email;
        employee.department = department;
        employee.salary = salary;
        employee.userId=userId;
        await employee.save();
        res.status(200).json({
            status: 200,
            message: 'Employee updated successfully',
            data: employee
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};


module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee,
    updateEmployee
};
