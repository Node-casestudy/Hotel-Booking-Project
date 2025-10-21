const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Hotel = sequelize.define('Hotel',{
    hotelId :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    hotelName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    hotelType:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'hotel',
    validate: {
      isIn: [['hotel', 'resort', 'villa']],
    },
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amenities:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    pincode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    totalRooms:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    priceMin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceMax: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ownerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'owners',
            key:'ownerId',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    }
},{
    tableName:'hotels',
    indexes:[{
        fields:['city'],
        fields:['state']
    }]
});


module.exports = Hotel