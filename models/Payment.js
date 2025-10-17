const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment',{
    paymentId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    paymentAmount:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    PaymentDate:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    paymentMode:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:['UPI','credit','debit']
        }
    },
    paymentStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'pending',
        validate:{
            isIn:['pending','success','declined']
        }
    },
    bookingId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'bookings',
            key:'bookingId',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',

    },
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'customers',
            key:'customerId'
        },
        onUpdate:'CASCADE',
        onDelete:'NO ACTION'
    }
},
{
    tableName:'payments',
    indexes:[
        {
            fields:['paymentDate'],
            fields:['paymentStatus']
        }
    ]
}
);

