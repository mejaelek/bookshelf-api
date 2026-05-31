require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');
const passport = require('./config/passport');
const swaggerSpec = require('./swagger/swagger');
const errorHandler = require('./middleware/errorHandler');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const authRouter = require('./routes/auth');

const app = express();

connectDB();

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        credentials: true,
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests — try again after 15 minutes' },
});
app.use('/api/', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            ttl: 24 * 60 * 60,
        }),
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.use('/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'BookShelf API is running',
        version: '2.0.0',
        documentation: '/api-docs',
        authentication: {
            login: '/auth/github',
            profile: '/auth/profile',
            logout: '/auth/logout',
        },
        endpoints: {
            books: '/api/books',
            authors: '/api/authors',
        },
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`BookShelf API running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    console.log(`Login: http://localhost:${PORT}/auth/github`);
});

module.exports = app;
