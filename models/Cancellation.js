const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Cancellation = sequelize.define('Cancellation',{
    cancellationId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    cancellationDate:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    cancellationReason:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    cancellationStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'pending',
        validate:{
            isIn:['pending','confirmed','rejected']
        }
    },
    bookingId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'bookings',
            key:'bookingId'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    }
},
{
    tableName:'cancellations',
    indexes:[{
        fields:['cancellationDate']
    }]
}
)

module.exports = Cancellation