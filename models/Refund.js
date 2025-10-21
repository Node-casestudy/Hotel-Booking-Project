const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Refund = sequelize.define('Refund',{
    refundId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    refundDate:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    refundAmount:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    refundStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'pending',
        validate:{
            isIn:['pending','refunded','declined']
        }
    },
    cancellationId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'cancellations',
            key:'cancellationId'
        },
        onDelete:'NO ACTION',
        onUpdate:'CASCADE'
    }
},
{
    tableName:'refunds',
    indexes:[{
        fields:['refundDate']
    }]
}
)
module.exports = Refund;