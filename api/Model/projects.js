const { Sequelize } = require('sequelize');
const sequelize = require('../db.js');
const user = require('./user.js');

const project = sequelize.define('project', {
    projectId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    project_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
},
    {
        tableName: 'project'
    });
project.belongsTo(user,{ foreignKey: 'userId' });
module.exports = project