const bcrypt = require('bcryptjs');
const { User, Customer, Owner, Admin } = require('../models');
const jwt = require('jsonwebtoken');
const { getSchemaByRole } = require('../validators/userValidation');


exports.register = async (req, res) => {
  const t = await User.sequelize.transaction();

  try {
    const { role } = req.body;

    // Get role-based Joi schema
    const schema = getSchemaByRole(role);
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'User Already Exist!!!', error: error.details[0].message });
    }

    // console.log(value.email);
    //in future user existence will find by mobile also
    const userExisting = await User.findOne({
      where:{
        email:value.email
      }
    });
    if(userExisting){
      return res.status(409).json({message:"User Already Exist!!! Try to Login"});
    };

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const createUser = await User.create(
      { name: value.name, email: value.email, password: hashedPassword, role: value.role },
      { transaction: t }
    );

    if (role === 'customer') {
      await Customer.create({ ...value, userId: createUser.id }, { transaction: t });
    } else if (role === 'owner') {
      await Owner.create({ ...value, userId: createUser.id }, { transaction: t });
    } else if (role === 'admin') {
      await Admin.create({ ...value, userId: createUser.id }, { transaction: t });
    }

    await t.commit();

    const { password: _, ...userData } = createUser.toJSON();
    res.status(201).json({ message: 'User registered successfully', user: userData });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

       
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
        let ownerId = null;
        ////Important function to be created 
        if(user.role == 'owner')
        {
          ownerId = await Owner.findOne(
            {
              where:{
                userId:user.id
              }
            }
          )
          if(ownerId.isVerified == false)
        {
          return res.status(401).json({message:"Unverified Owners can't login!!"})
        }
          // console.log(ownerId);
}

        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '15m' } 
        );

        const { password: _, ...userData } = user.toJSON();

        res.status(200).json({
            message: 'Login successful',
            user: userData,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
