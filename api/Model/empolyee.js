const { Sequelize } = require('sequelize');
const sequelize = require('../db.js');
const user = require('./user.js');
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
  }
},
  {
    tableName: 'employee'
  });


employee.belongsTo(user,{ foreignKey: 'userId' });

module.exports = employee