const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review',{
    reviewId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    reviewType: {
        type: DataTypes.ENUM('hotel', 'room'),
        allowNull: false,
        comment: 'Specifies whether the review is for a hotel or room'
      },
    reviewComments:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    reviewDate:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    reviewRating:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    roomId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'rooms',
            key:'roomId'
        },onDelete:'NO ACTION',
        onUpdate:'CASCADE'
    },
    hotelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'hotels',
          key: 'hotelId'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      customerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'customers',
            key:'customerId'
        },
        onDelete:'NO ACTION',
        onUpdate:'CASCADE'
      }
},
{
    tableName:'reviews',
    indexes:[
    { fields: ['hotelId'] },
    { fields: ['roomId'] },
    { fields: ['customerId']}
    ]
}
)
module.exports = Review