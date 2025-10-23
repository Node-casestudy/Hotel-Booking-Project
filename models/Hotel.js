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
      isIn:[['hotel', 'resort', 'motel', 'guesthouse', 'luxury']]
    }
},
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amenities: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('amenities');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('amenities', JSON.stringify(value));
        }
    }
    ,
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
        allowNull: false,
        validate: {
            min: 0, // minimum allowed value
            isInt: true // must be an integer
        }
    },
    priceMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            isInt: true,
            isGreaterThanMin(value) {
                if (value < this.priceMin) {
                    throw new Error("priceMax must be greater than or equal to priceMin");
                }
            }
        }
    },    
    isVerified:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
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