const swaggerJsDoc = require('swagger-jsdoc');

// Get repository name from package.json or environment
const repoName = 'user-management-api'; // Replace with your actual GitHub repo name if different

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'A simple RESTful API for managing users with JWT-based authentication',
      contact: {
        name: 'API Support'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: `https://ramya-shah.github.io/user-management-api/`, // Replace with your actual API URL when deployed
        description: 'Production server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: **Bearer &lt;token&gt;**'
        },
      },
      examples: {
        loginResponse: {
          value: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4ifQ...."
          }
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsDoc(options);

module.exports = specs;