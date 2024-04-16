const { Sequelize } = require('sequelize');
const sequelize = require('../db.js');
const Employee=require('./empolyee.js');
const Project=require('./projects.js');
const User =require('./user.js')
const Task = sequelize.define('task', {
    TaskID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM('todo', 'in_progress', 'completed'),
        defaultValue: 'todo'
    },
    deadline: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

Task.belongsTo(Project,{ foreignKey: 'projectId' });
Task.belongsTo(Employee,{ foreignKey: 'id' });
Task.belongsTo(User,{ foreignKey: 'userId' });
module.exports = Task;