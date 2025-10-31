const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel Booking API',
      version: '1.0.0',
      description: 'Auto-generated Swagger docs for Hotel Booking backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // 👈 Automatically scan all routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
