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
