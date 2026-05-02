# Node.js Movie Watchlist API

A RESTful API built with Node.js, Express, Prisma ORM, and Supabase PostgreSQL. Features user authentication, movie management, and a personal watchlist system.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma v7
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod
- **Dev Tools**: Nodemon

## Project Structure

```
node-js-api/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   ├── seed.js
│   └── prisma.config.ts
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── watchlist_controller.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movie_routes.js
│   │   └── watchlist_routes.js
│   ├── utils/
│   │   └── generate_token.js
│   ├── validators/
│   │   ├── auth_validator.js
│   │   └── watchlist_validator.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- A Supabase account
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/node-js-api.git
cd node-js-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL="your-supabase-connection-string"
NODE_ENV="development"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"
CREATOR_ID="your-user-id"
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Seed the database:
```bash
npm run seed:movies
```

7. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and get JWT token | No |
| POST | `/auth/logout` | Logout user | No |

### Movies

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/movies` | Get all movies | No |
| POST | `/movies` | Create a movie | No |
| PUT | `/movies` | Update a movie | No |
| DELETE | `/movies` | Delete a movie | No |

### Watchlist

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/watchlist` | Add movie to watchlist | Yes |

## Authentication

This API uses JWT (JSON Web Tokens). After logging in, include the token in the `Authorization` header:

```
Authorization: Bearer your-token-here
```

## Request & Response Examples

### Register
**POST** `/auth/register`
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```
Response:
```json
{
    "status": "success",
    "data": {
        "user": {
            "id": "uuid",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "token": "jwt-token"
    }
}
```

### Login
**POST** `/auth/login`
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

### Add to Watchlist
**POST** `/watchlist`
```json
{
    "movie_id": "movie-uuid",
    "status": "PLANNED",
    "rating": 9,
    "notes": "Must watch!"
}
```

## Database Schema

### User
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | User's full name |
| email | String | Unique email |
| password | String | Hashed password |
| createdAt | DateTime | Timestamp |

### Movie
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| title | String | Movie title |
| overview | String | Movie description |
| releaseYear | Int | Year of release |
| genres | String | Movie genres |
| runtime | String | Movie duration |
| posterUrl | String | Poster image URL |
| createdBy | UUID | Foreign key to User |
| createdAt | DateTime | Timestamp |

### WatchlistItem
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | Foreign key to User |
| movieId | UUID | Foreign key to Movie |
| status | Enum | PLANNED, WATCHING, COMPLETED, DROPPED |
| rating | Int | Rating 1-10 |
| notes | String | Personal notes |
| createdAt | DateTime | Timestamp |
| updatedAt | DateTime | Last updated |

## Watchlist Status Options

- `PLANNED` - Movie added to watch later
- `WATCHING` - Currently watching
- `COMPLETED` - Finished watching
- `DROPPED` - Stopped watching

## Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | Supabase PostgreSQL connection string |
| NODE_ENV | Environment (development/production) |
| JWT_SECRET | Secret key for JWT signing |
| JWT_EXPIRES_IN | JWT expiration time (e.g. 7d) |
| CREATOR_ID | Default user ID for seeding |

## License

MIT
