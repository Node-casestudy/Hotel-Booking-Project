const User = require('./User');
const Customer = require('./Customer');
const Owner = require('./Owner');
const Admin = require('./Admin');
const Hotel = require('./Hotel');
const Room = require('./Room');
const Booking = require('./Booking');
const Payment = require('./Payment')

//User relationship between Customer,admin,owner
//(One User : One customer)

User.hasOne(Customer,{foreignKey:'userId',as:'customer'});
Customer.belongsTo(User,{foreignKey:'userId',as:'user'});

User.hasOne(Owner,{foreignKey:'userId',as:'owner'});
Owner.belongsTo(User,{foreignKey:'userId',as:'user'});

User.hasOne(Admin,{foreignKey:'userId',as:'admin'});
Admin.belongsTo(User,{foreignKey:'userId',as:'user'});

//Hotel with Owner(One owner : n hotels)
Owner.hasMany(Hotel,{foreignKey:'ownerId',sourceKey:'ownerId',as:'hotel'});
Hotel.belongsTo(Owner,{foreignKey:'ownerId',targetKey:'ownerId',as:'owner'});

//Hotel with room(One Hotel : n rooms)
Hotel.hasMany(Room,{foreignKey:'hotelId',sourceKey:'hotelId',as:'room'});
Room.belongsTo(Hotel,{foreignKey:'hotelId',targetKey:'hotelId',as:'hotel'});

//Room with Booking(One Room : n Bookings)
Room.hasMany(Booking, { foreignKey: 'roomId', as: 'booking' });
Booking.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

//Booking with Payment(One Booking : One Payment)
Booking.hasOne(Payment,{foreignKey:'bookingId',as:'payment'});
Payment.belongsTo(Booking,{foreignKey:'bookingId',as:'booking'});

//
