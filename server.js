const express = require("express")
const app = express();
const cors = require("cors")
const mssql = require("mssql")
const sequelize = require('./config/db')
const { User, Customer, Owner, Admin, Hotel, Room, Booking, Payment,Cancellation,Refund } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.use(express.json());

const {authRoutes,customerRoutes,ownerRoutes,adminRoutes,hotelRoutes,roomRoutes} = require('./routes')
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth',authRoutes);
app.use('/api/customer',customerRoutes);
app.use('/api/owner',ownerRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/hotel',hotelRoutes);
app.use('/api/room',roomRoutes)













sequelize.authenticate()
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('DB Connection Failed:', err));

sequelize.sync({create:true}) // optional: create/alter tables
  .then(() => console.log('Tables synced'));



app.listen(process.env.SERVER_PORT,()=>{console.log(`Server is listening to the port ${process.env.SERVER_PORT}`)})
