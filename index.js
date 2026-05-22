require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');
const swaggerSpec = require('./swagger/swagger');
const errorHandler = require('./middleware/errorHandler');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

const app = express();

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Security middleware ──────────────────────────────────────────────────────
app.use(
    helmet({
        contentSecurityPolicy: false, // Disabled so Swagger UI renders correctly
    })
);

app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests — please try again after 15 minutes' },
});
app.use('/api/', limiter);

// ─── Body parsing ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── API documentation ───────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'BookShelf API is running',
        version: '1.0.0',
        documentation: '/api-docs',
        endpoints: {
            books: '/api/books',
            authors: '/api/authors',
        },
    });
});

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// ─── Central error handler (must be last) ────────────────────────────────────
app.use(errorHandler);

// ─── Start server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`BookShelf API running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

module.exports = app;