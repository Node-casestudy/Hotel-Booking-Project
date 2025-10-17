const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Customer = sequelize.define('Customer',{
    customerId : {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false  
    },
    customerName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_email :{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    customerMobile :{
        type:DataTypes.BIGINT,
        allowNull: false,
        unique:true
    },
    customerAddress:{
        type:DataTypes.STRING,
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
        tableName:'customers'
    });


    
