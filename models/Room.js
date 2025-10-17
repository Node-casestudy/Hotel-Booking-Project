const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Room = sequelize.define('Room',{
    roomId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    roomType:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn: [['Single','Double','Suite','Deluxe','Family']],
        }
    },
    roomAmenities:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roomPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    availability:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:[['available','not_available']]
        }
    },
    hotelId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'hotels',
            key:'hotelId',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
    },
},
{
    tableName:'rooms',
    indexes:[
        {
            fields:['roomType'],
            fields:['roomPrice']
        }
    ]
})
