const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Room = sequelize.define('Room',{
    roomId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    roomNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    bedType:{
        type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Single', 'Double', 'Queen', 'King', 'Twin', 'Full', 'Super King', 'Bunk Bed', 'Sofa Bed', 'Murphy Bed']]
    }
    },
    capacity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate: {
            min: 1,
            max: 10
        }
    },
    roomType:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn: [['Single','Double','Suite','Deluxe','Family']],
        }
    },
    roomAmenities:{
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('roomAmenities');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('roomAmenities', JSON.stringify(value));
        }
    },
    roomPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    availability:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"available",
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

module.exports = Room
