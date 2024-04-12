const { Sequelize } = require('sequelize');
const sequelize = require('../db.js');

const employee = sequelize.define('employee', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salary: {
    type: Sequelize.FLOAT, // Assuming salary is a floating-point number
    allowNull: false
  },
  project_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
  {
    tableName: 'employee'
  });




module.exports = employee