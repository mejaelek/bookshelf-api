# BookShelf API

A RESTful API for managing books and authors, built with Node.js, Express, and MongoDB Atlas. Includes full CRUD operations, data validation, error handling, GitHub OAuth authentication, and interactive Swagger documentation.

## Features

- Full CRUD operations for `books` and `authors` collections
- GitHub OAuth authentication via Passport.js
- Session-based auth with sessions stored in MongoDB
- Protected routes — POST, PUT, DELETE require login
- Data validation and comprehensive error handling
- Pagination and filtering on all GET endpoints
- Rate limiting and security headers via Helmet
- Interactive API documentation via Swagger UI

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | Passport.js + GitHub OAuth |
| Sessions | express-session + connect-mongo |
| Documentation | Swagger UI (OpenAPI 3.0) |
| Security | Helmet, CORS, express-rate-limit |
| Deployment | Render |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/mejaelek/bookshelf-api.git
cd bookshelf-api
npm install
```

### 2. Create a GitHub OAuth App

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click **OAuth Apps → New OAuth App**
3. Fill in:
   - Application name: `BookShelf API`
   - Homepage URL: `http://localhost:4000`
   - Authorization callback URL: `http://localhost:4000/auth/github/callback`
4. Click **Register application**
5. Copy the **Client ID** and generate a **Client Secret**

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your real values:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bookshelf?retryWrites=true&w=majority
PORT=4000
NODE_ENV=development
SESSION_SECRET=your_strong_random_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/auth/github/callback
```

Generate a strong session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run locally

```bash
npm run dev
```

| URL | Description |
|---|---|
| `http://localhost:4000` | Health check |
| `http://localhost:4000/api-docs` | Swagger UI |
| `http://localhost:4000/auth/github` | Login with GitHub |
| `http://localhost:4000/auth/profile` | Current user profile |
| `http://localhost:4000/auth/logout` | Logout |

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/auth/github` | Initiate GitHub login | No |
| GET | `/auth/github/callback` | OAuth callback | No |
| GET | `/auth/profile` | Get current user | Yes |
| GET | `/auth/logout` | Logout | Yes |

### Books

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/books` | Get all books (paginated) | No |
| GET | `/api/books/:id` | Get a single book | No |
| POST | `/api/books` | Create a new book | Yes |
| PUT | `/api/books/:id` | Update a book | Yes |
| DELETE | `/api/books/:id` | Delete a book | Yes |

### Authors

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/authors` | Get all authors (paginated) | No |
| GET | `/api/authors/:id` | Get a single author | No |
| POST | `/api/authors` | Create a new author | Yes |
| PUT | `/api/authors/:id` | Update an author | Yes |
| DELETE | `/api/authors/:id` | Delete an author | Yes |

---

## How Authentication Works

1. Visit `/auth/github` in your browser
2. Authorize the app on GitHub
3. GitHub redirects to `/auth/github/callback`
4. A session cookie (`connect.sid`) is set automatically
5. All protected routes now accept your requests
6. Visit `/auth/logout` to end the session

Unauthenticated requests to protected routes return:
```json
{
  "success": false,
  "message": "Unauthorized — please log in via /auth/github to access this route",
  "loginUrl": "/auth/github"
}
```

---

## Deploying to Render

1. Push to GitHub
2. Create a new **Web Service** in Render pointing to your repo
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node index.js`
5. Add all environment variables under **Environment → Config Vars**:

| Key | Value |
|---|---|
| `MONGODB_URI` | Your Atlas connection string |
| `NODE_ENV` | `production` |
| `SESSION_SECRET` | Your generated secret |
| `GITHUB_CLIENT_ID` | Your GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth Client Secret |
| `GITHUB_CALLBACK_URL` | `https://bookshelf-api-1-736v.onrender.com/auth/github/callback` |

6. Update your GitHub OAuth App callback URL to match the Render URL

---

## MongoDB Collections

| Collection | Documents | Description |
|---|---|---|
| `books` | 11+ fields | Book records with author reference |
| `authors` | 9+ fields | Author records |
| `users` | 6 fields | GitHub OAuth user profiles |

---

## Links

- GitHub: https://github.com/mejaelek/bookshelf-api
- Live API: https://bookshelf-api-1-736v.onrender.com
- Swagger Docs: https://bookshelf-api-1-736v.onrender.com/api-docs
- Login: https://bookshelf-api-1-736v.onrender.com/auth/github
