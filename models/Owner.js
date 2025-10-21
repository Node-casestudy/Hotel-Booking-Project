const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Owner = sequelize.define('Owner',{
    ownerId :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    ownerName :{
        type:DataTypes.STRING,
        allowNull:false
    },
    ownerEmail :{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    ownerMobile:{
        type:DataTypes.BIGINT,
        allowNull:false,
        unique:true
    },
    ownerAddress:{
        type:DataTypes.STRING,
        allowNull:false
    },
    businessLicenceNo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    gstNumber:{
        type:DataTypes.BIGINT,
        unique:true,
        allowNull:false
    },
    bankAccountNumber:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    ifscCode:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
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
    tableName:'owners',
    indexes:[
        {
            fields:['isVerified']
        }
    ]
});

module.exports = Owner

