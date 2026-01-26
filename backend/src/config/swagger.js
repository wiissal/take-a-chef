const swaggerJsdoc = require ('swagger-jsdoc');
const options = {
  definition: { 
    openapi: '3.0.0',
    info:{
      title: 'TAKE A CHEF API',
      version: '1.0.0',
      description: 'API documentation for Take A Chef - Mobile app for discovering and booking chefs',
      contact: {
        name: 'Wissal Ouboudjemaa',
        email: 'wissalouboujemaa@gmail.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      },
      {
        url: 'https://your-production-url.com/api',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  // Path to the API routes files
  apis: ['./src/routes/*.js', './server.js']
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;