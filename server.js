const express = require("express")
const app = express();
const cors = require("cors")
const mssql = require("mssql")
const sequelize = require('./config/db')
const User = require('./models/User');
const Customer = require('./models/Customer');
const Owner = require('./models/Owner');
const Admin = require('./models/Admin');
const Hotel = require('./models/Hotel')
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Payment = require('./models/Payment')
const Cancellation = require('./models/Cancellation');
const Refund = require('./models/Refund');
const review = require('./models/Review')

app.use(cors());


sequelize.authenticate()
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('DB Connection Failed:', err));

sequelize.sync({force:true}) // optional: create/alter tables
  .then(() => console.log('Tables synced'));



app.listen(process.env.SERVER_PORT,()=>{console.log(`Server is listening to the port ${process.env.SERVER_PORT}`)})
