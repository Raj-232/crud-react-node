const { Sequelize } = require('sequelize');
const sequelize = require('../db.js');

const user = sequelize.define('user', {
  userId: {
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
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
  {
    tableName: 'user'
  });




module.exports = user