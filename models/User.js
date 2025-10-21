const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique:true   
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',
    validate: {
      isIn: [['customer', 'owner', 'admin']],
    },
    allowNull:false
  }
}, {
  tableName: 'users',
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ['email'], 
  //   },
  // ],
  timestamps: true
});


module.exports = User;

