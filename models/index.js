const User = require('./User');
const Customer = require('./Customer');
const Owner = require('./Owner');
const Admin = require('./Admin');
const Hotel = require('./Hotel');
const Room = require('./Room');
const Booking = require('./Booking');
const Payment = require('./Payment');
const Refund = require('./Refund')
const Cancellation = require('./Cancellation')

// Associations (as before)
User.hasOne(Customer, { foreignKey: 'userId', as: 'customer' });
Customer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Owner, { foreignKey: 'userId', as: 'owner' });
Owner.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Admin, { foreignKey: 'userId', as: 'admin' });
Admin.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Owner.hasMany(Hotel,{foreignKey:'ownerId',as:'hotel'});
Hotel.belongsTo(Owner,{foreignKey:'ownerId',as:'owner'});

Hotel.hasMany(Room,{foreignKey:'hotelId',as:'room'});
Room.belongsTo(Hotel,{foreignKey:'hotelId',as:'hotel'});

Room.hasMany(Booking,{foreignKey:'roomId',as:'booking'});
Booking.belongsTo(Room,{foreignKey:'roomId',as:'room'});

Customer.hasMany(Booking, { foreignKey: 'customerId', as: 'booking' });
Booking.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });




module.exports = {
  sequelize: require('../config/db'), // export sequelize instance
  User,
  Customer,
  Cancellation,
  Refund,
  Owner,
  Admin,
  Hotel,
  Room,
  Booking,
  Payment
};
