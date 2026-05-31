const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BookShelf API',
            version: '2.0.0',
            description: `
## BookShelf API

A RESTful API for managing books and authors with full CRUD operations, data validation, error handling, and GitHub OAuth authentication.

### Authentication
This API uses **GitHub OAuth** for authentication via session cookies.

**To log in:**
1. Open this URL in your browser: \`/auth/github\`
2. Authorize the app on GitHub
3. You will be redirected back with a session cookie set automatically
4. All protected routes (POST, PUT, DELETE) will now work in your browser

**Protected routes** require you to be logged in. Unauthenticated requests return \`401 Unauthorized\`.

**To log out:** Visit \`/auth/logout\`
      `,
            contact: {
                name: 'BookShelf API Support',
                email: 'support@bookshelf-api.example.com',
            },
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://bookshelf-api-1-736v.onrender.com'
                    : `http://localhost:${process.env.PORT || 4000}`,
                description: process.env.NODE_ENV === 'production'
                    ? 'Production server'
                    : 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid',
                    description: 'Session cookie set after GitHub OAuth login via /auth/github',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
