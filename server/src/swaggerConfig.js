const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'API documentation for Classified Ads App For Good',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/docs/*.js'],
}

const swaggerSpecs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerSpecs
