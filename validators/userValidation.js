// validators/userValidator.js
const Joi = require('joi');

// Common fields for all users
const baseSchema = {
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('customer', 'owner', 'admin').required()
};

// Role-specific schemas
const customerSchema = Joi.object({
  ...baseSchema,
  customerName: Joi.string().required(),
  customerEmail: Joi.string().email().required(),
  customerMobile: Joi.string().required(),
  customerAddress: Joi.string().required()
});

const ownerSchema = Joi.object({
  ...baseSchema,
  ownerName: Joi.string().required(),
  ownerEmail: Joi.string().email().required(),
  ownerMobile: Joi.string().required(),
  ownerAddress: Joi.string().required(),
  businessLicenceNo: Joi.string().required(),
  gstNumber: Joi.string().required(),
  bankAccountNumber: Joi.string().required(),
  ifscCode: Joi.string().required()
});

const adminSchema = Joi.object({
  ...baseSchema,
  adminName: Joi.string().required(),
  adminMobile: Joi.string().required(),
  adminEmail: Joi.string().email().required()
});

// Function to get schema based on role
const getSchemaByRole = (role) => {
  switch (role) {
    case 'customer': return customerSchema;
    case 'owner': return ownerSchema;
    case 'admin': return adminSchema;
    default: return baseSchema;
  }
};

module.exports = { getSchemaByRole };
