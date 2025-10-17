const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const Admin = sequelize.define('Admin',{
    adminId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    adminName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    adminMobile: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
          len: [10, 10], // must be exactly 10 chars
          isNumeric: true // only numbers allowed
        }
      }
      ,
    adminEmail:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      },
},
{
    tableName:'admins'
});


