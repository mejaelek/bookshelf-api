 # BookShelf API

A RESTful API for managing books and authors, built with Node.js, Express, and MongoDB Atlas.

## Features

- Full CRUD operations for `books` and `authors` collections
- Data validation and comprehensive error handling
- Pagination and filtering on all GET endpoints
- Rate limiting and security headers via Helmet
- Interactive API documentation via Swagger UI
- Deployed to Render

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Documentation | Swagger UI (OpenAPI 3.0) |
| Security | Helmet, CORS, express-rate-limit |
| Deployment | Render |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/bookshelf-api.git
cd bookshelf-api
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB Atlas connection string:

```
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bookshelf?retryWrites=true&w=majority
NODE_ENV=development
```

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000/api-docs` for interactive Swagger documentation.

## API Endpoints

### Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Get all books (paginated, filterable) |
| GET | `/api/books/:id` | Get a single book |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

### Authors

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/authors` | Get all authors (paginated, filterable) |
| GET | `/api/authors/:id` | Get a single author |
| POST | `/api/authors` | Create a new author |
| PUT | `/api/authors/:id` | Update an author |
| DELETE | `/api/authors/:id` | Delete an author |

## Deploying to Render

1. Push to GitHub
2. Create a new **Web Service** in Render pointing to your repo
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node index.js`
5. Add environment variables under **Environment → Config Vars**:
   - `MONGODB_URI` — your Atlas connection string
   - `NODE_ENV` — `production`

## Links

- GitHub: https://github.com/YOUR_USERNAME/bookshelf-api
- Live API: https://bookshelf-api.onrender.com
- Swagger Docs: https://bookshelf-api.onrender.com/api-docs