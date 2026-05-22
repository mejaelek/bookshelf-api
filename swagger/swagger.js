const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BookShelf API',
            version: '1.0.0',
            description:
                'A RESTful API for managing a collection of books and authors. Supports full CRUD operations with data validation, error handling, and pagination.',
            contact: {
                name: 'BookShelf API Support',
                email: 'support@bookshelf-api.example.com',
            },
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://bookshelf-api.onrender.com'
                    : `http://localhost:${process.env.PORT || 3000}`,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local development server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
