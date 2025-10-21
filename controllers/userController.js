const bcrypt = require('bcryptjs');
const { User, Customer, Owner, Admin } = require('../models');

exports.register = async (req, res) => {
    const t = await User.sequelize.transaction();
    try {
        const {
            name, email, password, role,
            customerName, customerEmail, customerMobile, customerAddress,
            ownerName, ownerEmail, ownerMobile, ownerAddress, businessLicenceNo, gstNumber, bankAccountNumber, ifscCode,
            adminName, adminMobile, adminEmail
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create(
            { name, email, password: hashedPassword, role },
            { transaction: t }
        );

        if (role === 'customer') {
            await Customer.create({
                customerName,
                customerEmail,
                customerMobile,
                customerAddress,
                userId: createUser.id
            }, { transaction: t });
        } else if (role === 'owner') {
            await Owner.create({
                ownerName,
                ownerEmail,
                ownerMobile,
                ownerAddress,
                businessLicenceNo,
                gstNumber,
                bankAccountNumber,
                ifscCode,
                userId: createUser.id
            }, { transaction: t });
        } else if (role === 'admin') {
            await Admin.create({
                adminName,
                adminMobile,
                adminEmail,
                userId: createUser.id
            }, { transaction: t });
        } else {
            throw new Error('Invalid role');
        }

        await t.commit();

        const { password: _, ...userData } = createUser.toJSON();
        res.status(201).json({ message: 'User registered successfully', user: userData });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};
